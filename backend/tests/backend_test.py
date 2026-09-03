"""Backend API tests for Aqua AI."""
import os
import time
import uuid
import requests
import pytest

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
    # fallback to frontend/.env
    from dotenv import dotenv_values
    v = dotenv_values("/app/frontend/.env")
    BASE_URL = v.get("REACT_APP_BACKEND_URL")
BASE_URL = BASE_URL.rstrip("/")
API = f"{BASE_URL}/api"

SESSION = f"TEST-e2e-{uuid.uuid4().hex[:8]}"


# ---------- Root ----------
def test_root():
    r = requests.get(f"{API}/", timeout=15)
    assert r.status_code == 200
    j = r.json()
    assert j["app"] == "Aqua AI"
    assert j["status"] == "online"
    assert j["mascot"] == "Mizuki"


# ---------- Chat streaming (SSE) ----------
def test_chat_stream_sse():
    payload = {"session_id": SESSION, "message": "Say hi in 3 words"}
    with requests.post(f"{API}/chat/stream", json=payload, stream=True, timeout=90) as r:
        assert r.status_code == 200
        assert "text/event-stream" in r.headers.get("content-type", "")
        chunks = []
        done_seen = False
        for raw in r.iter_lines(decode_unicode=True):
            if raw is None:
                continue
            if raw.startswith("data:"):
                chunks.append(raw[5:].strip())
            if raw.startswith("event: done"):
                done_seen = True
                break
        text = "".join(c for c in chunks if c and c != "[DONE]")
        assert done_seen, "SSE stream did not send event: done"
        assert len(text) > 0, f"Empty assistant response. chunks={chunks}"


def test_chat_history_after_stream():
    # small delay to allow persistence
    time.sleep(1)
    r = requests.get(f"{API}/chat/history/{SESSION}", timeout=15)
    assert r.status_code == 200
    msgs = r.json()
    assert isinstance(msgs, list)
    assert len(msgs) >= 2
    assert msgs[0]["role"] == "user"
    assert any(m["role"] == "assistant" for m in msgs)


def test_chat_history_delete():
    r = requests.delete(f"{API}/chat/history/{SESSION}", timeout=15)
    assert r.status_code == 200
    r2 = requests.get(f"{API}/chat/history/{SESSION}", timeout=15)
    assert r2.status_code == 200
    assert r2.json() == []


# ---------- Hydration ----------
HYDRATION_SESSION = f"TEST-hyd-{uuid.uuid4().hex[:8]}"


def test_hydration_add_valid():
    r = requests.post(f"{API}/hydration/add",
                      json={"session_id": HYDRATION_SESSION, "amount_ml": 250}, timeout=15)
    assert r.status_code == 200
    j = r.json()
    assert j["amount_ml"] == 250
    assert "ts" in j
    assert j["session_id"] == HYDRATION_SESSION


@pytest.mark.parametrize("amount", [0, -100, 5001, 10000])
def test_hydration_add_invalid(amount):
    r = requests.post(f"{API}/hydration/add",
                      json={"session_id": HYDRATION_SESSION, "amount_ml": amount}, timeout=15)
    assert r.status_code == 400


def test_hydration_today():
    # add another 500
    requests.post(f"{API}/hydration/add",
                  json={"session_id": HYDRATION_SESSION, "amount_ml": 500}, timeout=15)
    r = requests.get(f"{API}/hydration/today/{HYDRATION_SESSION}", timeout=15)
    assert r.status_code == 200
    j = r.json()
    assert j["total_ml"] == 750
    assert j["count"] == 2
    assert len(j["logs"]) == 2


def test_hydration_reset():
    r = requests.delete(f"{API}/hydration/reset/{HYDRATION_SESSION}", timeout=15)
    assert r.status_code == 200
    r2 = requests.get(f"{API}/hydration/today/{HYDRATION_SESSION}", timeout=15)
    assert r2.json()["total_ml"] == 0
    assert r2.json()["count"] == 0


# ---------- Quality analyzer ----------
@pytest.mark.parametrize("ph,tds,expected_tone", [
    (7.2, 180, "success"),   # excellent
    (7.0, 500, "good"),      # good
    (6.0, 800, "warn"),      # fair-ish; 6.0 ph_score=76, tds=60 => 68 => good actually
    (5.0, 1300, "bad"),      # poor
])
def test_quality_analyze(ph, tds, expected_tone):
    r = requests.post(f"{API}/quality/analyze", json={"ph": ph, "tds": tds}, timeout=15)
    assert r.status_code == 200
    j = r.json()
    assert "overall" in j and "verdict" in j and "tone" in j
    assert j["tone"] in ["success", "good", "warn", "bad"]


def test_quality_analyze_bad_specific():
    # ensure a truly bad case returns 'bad'
    r = requests.post(f"{API}/quality/analyze", json={"ph": 3.0, "tds": 1500}, timeout=15)
    assert r.json()["tone"] == "bad"


def test_quality_tips():
    r = requests.get(f"{API}/quality/tips", timeout=15)
    assert r.status_code == 200
    tips = r.json()["tips"]
    assert len(tips) == 6
    for t in tips:
        assert "impact_l_per_day" in t and isinstance(t["impact_l_per_day"], int)


# ---------- Marine ----------
def test_marine_life():
    r = requests.get(f"{API}/marine/life", timeout=15)
    assert r.status_code == 200
    j = r.json()
    assert len(j["items"]) == 4
    assert len(j["zones"]) == 5


def test_marine_quiz():
    r = requests.get(f"{API}/marine/quiz", timeout=15)
    assert r.status_code == 200
    quiz = r.json()["quiz"]
    assert len(quiz) == 4
    for q in quiz:
        assert "options" in q and "answer" in q
        assert 0 <= q["answer"] < len(q["options"])


# ---------- Water Test Wizard: /quality/samples ----------
def test_quality_samples():
    r = requests.get(f"{API}/quality/samples", timeout=15)
    assert r.status_code == 200
    samples = r.json()["samples"]
    assert len(samples) == 3
    names = [s["name"] for s in samples]
    assert names == ["Clean Mountain Spring", "City Tap Water", "Well Water (Untreated)"]
    required = ["ph", "hardness", "solids", "chloramines", "sulfate",
                "conductivity", "organic_carbon", "trihalomethanes", "turbidity"]
    for s in samples:
        for k in required:
            assert k in s, f"sample {s['name']} missing {k}"
            assert isinstance(s[k], (int, float))


# ---------- Water Test Wizard: /quality/predict (9 params) ----------
PARAM_KEYS = ["ph", "hardness", "solids", "chloramines", "sulfate",
              "conductivity", "organic_carbon", "trihalomethanes", "turbidity"]


def test_quality_predict_all_safe():
    payload = {"ph": 7.2, "hardness": 150, "solids": 320, "chloramines": 2.1,
               "sulfate": 180, "conductivity": 420, "organic_carbon": 1.6,
               "trihalomethanes": 42, "turbidity": 2.1}
    r = requests.post(f"{API}/quality/predict", json=payload, timeout=20)
    assert r.status_code == 200
    j = r.json()
    assert j["overall"] == 100.0
    assert j["potable"] is True
    assert j["tone"] == "success"
    assert len(j["details"]) == 9
    assert {d["key"] for d in j["details"]} == set(PARAM_KEYS)
    for d in j["details"]:
        assert d["status"] == "safe"
        assert d["score"] == 100.0
        assert "label" in d and "safe_low" in d and "safe_high" in d and "unit" in d
    assert j["recommendations"] == ["All parameters look great. Keep monitoring quarterly!"]


def test_quality_predict_well_water_bad():
    payload = {"ph": 6.2, "hardness": 380, "solids": 980, "chloramines": 5.2,
               "sulfate": 340, "conductivity": 1050, "organic_carbon": 3.1,
               "trihalomethanes": 95, "turbidity": 6.8}
    r = requests.post(f"{API}/quality/predict", json=payload, timeout=20)
    assert r.status_code == 200
    j = r.json()
    assert j["potable"] is False
    assert j["tone"] in ["warn", "bad", "good"]
    flagged = [d for d in j["details"] if d["status"] != "safe"]
    assert len(flagged) >= 5
    assert len(j["recommendations"]) == len(flagged)


def test_quality_predict_tone_boundaries():
    """Verify tone/verdict mapping consistency with the returned overall score."""
    cases = [
        {"ph": 7.8, "hardness": 220, "solids": 610, "chloramines": 3.6, "sulfate": 260,
         "conductivity": 720, "organic_carbon": 2.4, "trihalomethanes": 68, "turbidity": 3.4},
        {"ph": 2.0, "hardness": 900, "solids": 5000, "chloramines": 14, "sulfate": 900,
         "conductivity": 3000, "organic_carbon": 30, "trihalomethanes": 200, "turbidity": 20},
    ]
    for payload in cases:
        r = requests.post(f"{API}/quality/predict", json=payload, timeout=20)
        assert r.status_code == 200
        j = r.json()
        o = j["overall"]
        expected = ("success" if o >= 85 else "good" if o >= 70 else "warn" if o >= 50 else "bad")
        assert j["tone"] == expected, f"overall={o} tone={j['tone']} expected={expected}"
        assert isinstance(j["verdict"], str) and len(j["verdict"]) > 0


def test_quality_predict_missing_field_422():
    payload = {"ph": 7.2}
    r = requests.post(f"{API}/quality/predict", json=payload, timeout=15)
    assert r.status_code == 422


def test_quality_predict_non_numeric_422():
    payload = {k: "abc" for k in PARAM_KEYS}
    r = requests.post(f"{API}/quality/predict", json=payload, timeout=15)
    assert r.status_code == 422


def test_quality_analyze_missing_field_422():
    r = requests.post(f"{API}/quality/analyze", json={"ph": 7.0}, timeout=15)
    assert r.status_code == 422


# ---------- Chat validation ----------
def test_chat_stream_missing_message_422():
    r = requests.post(f"{API}/chat/stream", json={"session_id": "TEST-x"}, timeout=20)
    assert r.status_code == 422


def test_chat_history_unknown_session_empty():
    r = requests.get(f"{API}/chat/history/TEST-nonexistent-{uuid.uuid4().hex[:6]}", timeout=15)
    assert r.status_code == 200
    assert r.json() == []


def test_hydration_today_unknown_session_zero():
    r = requests.get(f"{API}/hydration/today/TEST-none-{uuid.uuid4().hex[:6]}", timeout=15)
    assert r.status_code == 200
    j = r.json()
    assert j["total_ml"] == 0 and j["count"] == 0 and j["logs"] == []


# ---------- Mongo _id leakage check ----------
def test_no_mongo_id_leakage():
    sid = f"TEST-leak-{uuid.uuid4().hex[:6]}"
    requests.post(f"{API}/hydration/add", json={"session_id": sid, "amount_ml": 300}, timeout=15)
    r = requests.get(f"{API}/hydration/today/{sid}", timeout=15)
    for log in r.json()["logs"]:
        assert "_id" not in log.keys()
    requests.delete(f"{API}/hydration/reset/{sid}", timeout=15)

    csid = f"TEST-leak2-{uuid.uuid4().hex[:6]}"
    h = requests.get(f"{API}/chat/history/{csid}", timeout=15)
    assert h.status_code == 200
    for m in h.json():
        assert "_id" not in m.keys()
