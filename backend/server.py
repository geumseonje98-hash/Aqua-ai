from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import uuid
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime, timezone, date

from emergentintegrations.llm.chat import LlmChat, UserMessage, TextDelta, StreamDone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY', '')

app = FastAPI(title="Aqua AI API")
api_router = APIRouter(prefix="/api")

MASCOT_SYSTEM_MSG = (
    "You are Aqua, a friendly anime water-droplet AI companion for AquaSafe AI. "
    "You are your user's cheerful water-quality guide, but you also love oceans, marine biology, "
    "hydration, sustainability and water chemistry (pH, TDS, chloramines, THMs, hardness, turbidity). "
    "Explain complex results simply, with warmth and a splash of playfulness. Use short paragraphs and "
    "occasional bullet points. Sprinkle in gentle water/ocean emojis sparingly (💧🌊🐠) when it feels natural. "
    "If a user asks about something totally unrelated to water/ocean/environment, gently steer them back "
    "while still being helpful. Keep answers concise unless the user asks for depth. Your model is Gemini 3.1 Pro."
)

# ---------- Models ----------
class ChatMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    role: str  # 'user' | 'assistant'
    content: str
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class ChatRequest(BaseModel):
    session_id: str
    message: str

class HydrationLog(BaseModel):
    session_id: str
    amount_ml: int
    ts: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class HydrationAdd(BaseModel):
    session_id: str
    amount_ml: int

class QualityAnalyzeRequest(BaseModel):
    ph: float
    tds: float  # ppm

class WaterTestRequest(BaseModel):
    ph: float
    hardness: float          # mg/L
    solids: float            # mg/L (TDS)
    chloramines: float       # mg/L (ppm)
    sulfate: float           # mg/L
    conductivity: float      # µS/cm
    organic_carbon: float    # mg/L
    trihalomethanes: float   # µg/L
    turbidity: float         # NTU

# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"app": "Aqua AI", "status": "online", "mascot": "Mizuki"}

# ----- Chat (SSE streaming with Gemini 3.1 Pro) -----
@api_router.post("/chat/stream")
async def chat_stream(req: ChatRequest):
    if not EMERGENT_LLM_KEY:
        raise HTTPException(status_code=500, detail="LLM key not configured")

    # Persist user message
    user_msg = ChatMessage(session_id=req.session_id, role="user", content=req.message)
    await db.chat_messages.insert_one(user_msg.model_dump())

    # Rehydrate history
    docs = await db.chat_messages.find(
        {"session_id": req.session_id}, {"_id": 0}
    ).sort("timestamp", 1).to_list(200)

    chat = LlmChat(
        api_key=EMERGENT_LLM_KEY,
        session_id=req.session_id,
        system_message=MASCOT_SYSTEM_MSG,
    ).with_model("gemini", "gemini-3.1-pro-preview")

    async def event_generator():
        assistant_text = ""
        try:
            async for event in chat.stream_message(UserMessage(text=req.message)):
                if isinstance(event, TextDelta):
                    assistant_text += event.content
                    # SSE frame
                    safe = event.content.replace("\r", "").replace("\n", "\\n")
                    yield f"data: {safe}\n\n"
                elif isinstance(event, StreamDone):
                    break
        except Exception as e:
            logger.exception("chat stream error")
            yield f"event: error\ndata: {str(e)}\n\n"
        finally:
            if assistant_text:
                a_msg = ChatMessage(
                    session_id=req.session_id, role="assistant", content=assistant_text
                )
                await db.chat_messages.insert_one(a_msg.model_dump())
            yield "event: done\ndata: [DONE]\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no", "Connection": "keep-alive"},
    )

@api_router.get("/chat/history/{session_id}", response_model=List[ChatMessage])
async def chat_history(session_id: str):
    docs = await db.chat_messages.find(
        {"session_id": session_id}, {"_id": 0}
    ).sort("timestamp", 1).to_list(500)
    return [ChatMessage(**d) for d in docs]

@api_router.delete("/chat/history/{session_id}")
async def clear_history(session_id: str):
    r = await db.chat_messages.delete_many({"session_id": session_id})
    return {"deleted": r.deleted_count}

# ----- Hydration Tracker -----
@api_router.post("/hydration/add")
async def hydration_add(payload: HydrationAdd):
    if payload.amount_ml <= 0 or payload.amount_ml > 5000:
        raise HTTPException(status_code=400, detail="Invalid amount")
    log = HydrationLog(session_id=payload.session_id, amount_ml=payload.amount_ml)
    await db.hydration_logs.insert_one(log.model_dump())
    return log

@api_router.get("/hydration/today/{session_id}")
async def hydration_today(session_id: str):
    today = date.today().isoformat()
    docs = await db.hydration_logs.find(
        {"session_id": session_id}, {"_id": 0}
    ).to_list(1000)
    today_logs = [d for d in docs if d.get("ts", "").startswith(today)]
    total = sum(d.get("amount_ml", 0) for d in today_logs)
    return {"date": today, "total_ml": total, "count": len(today_logs), "logs": today_logs}

@api_router.delete("/hydration/reset/{session_id}")
async def hydration_reset(session_id: str):
    today = date.today().isoformat()
    r = await db.hydration_logs.delete_many({
        "session_id": session_id, "ts": {"$regex": f"^{today}"}
    })
    return {"deleted": r.deleted_count}

# ----- Water Quality Analyzer (deterministic scoring) -----
@api_router.post("/quality/analyze")
async def quality_analyze(req: QualityAnalyzeRequest):
    ph_score = max(0, 100 - abs(req.ph - 7.2) * 20)
    if req.tds < 300:
        tds_score = 100
    elif req.tds < 600:
        tds_score = 85
    elif req.tds < 900:
        tds_score = 60
    elif req.tds < 1200:
        tds_score = 35
    else:
        tds_score = 10
    overall = round((ph_score * 0.5) + (tds_score * 0.5), 1)
    if overall >= 85:
        verdict = "Excellent — safe & refreshing 💧"
        tone = "success"
    elif overall >= 65:
        verdict = "Good — generally safe to drink 🌊"
        tone = "good"
    elif overall >= 40:
        verdict = "Fair — consider filtration 🧪"
        tone = "warn"
    else:
        verdict = "Poor — do not consume without treatment ⚠️"
        tone = "bad"
    return {
        "ph": req.ph, "tds": req.tds,
        "ph_score": round(ph_score, 1),
        "tds_score": round(tds_score, 1),
        "overall": overall, "verdict": verdict, "tone": tone,
    }

# ----- Static content: conservation tips, marine facts -----
CONSERVATION_TIPS = [
    {"id": 1, "title": "Shorter Showers", "detail": "Cutting shower time by 4 minutes saves ~40 liters per shower.", "impact_l_per_day": 40},
    {"id": 2, "title": "Fix Leaks", "detail": "A single dripping tap can waste 20+ liters daily. Fix seals promptly.", "impact_l_per_day": 20},
    {"id": 3, "title": "Full Loads Only", "detail": "Run dishwashers & washing machines with full loads.", "impact_l_per_day": 60},
    {"id": 4, "title": "Rainwater Harvesting", "detail": "Collect roof runoff for gardens & cleaning.", "impact_l_per_day": 100},
    {"id": 5, "title": "Low-Flow Fixtures", "detail": "Aerators & low-flow showerheads cut usage by up to 50%.", "impact_l_per_day": 80},
    {"id": 6, "title": "Mindful Watering", "detail": "Water plants early morning to reduce evaporation.", "impact_l_per_day": 25},
]

@api_router.get("/quality/tips")
async def quality_tips():
    return {"tips": CONSERVATION_TIPS}

# WHO/EPA reference bands
_SAFE_BANDS = {
    "ph":              {"low": 6.5,  "high": 8.5,   "unit": "",     "label": "pH"},
    "hardness":        {"low": 60,   "high": 200,   "unit": "mg/L", "label": "Hardness"},
    "solids":          {"low": 0,    "high": 500,   "unit": "mg/L", "label": "Solids (TDS)"},
    "chloramines":     {"low": 0,    "high": 4.0,   "unit": "mg/L", "label": "Chloramines"},
    "sulfate":         {"low": 0,    "high": 250,   "unit": "mg/L", "label": "Sulfate"},
    "conductivity":    {"low": 0,    "high": 800,   "unit": "µS/cm","label": "Conductivity"},
    "organic_carbon":  {"low": 0,    "high": 2.0,   "unit": "mg/L", "label": "Organic Carbon"},
    "trihalomethanes": {"low": 0,    "high": 80,    "unit": "µg/L", "label": "Trihalomethanes"},
    "turbidity":       {"low": 0,    "high": 5.0,   "unit": "NTU",  "label": "Turbidity"},
}

def _param_score(key: str, value: float) -> dict:
    b = _SAFE_BANDS[key]
    low, high = b["low"], b["high"]
    if low <= value <= high:
        score = 100.0
        status = "safe"
    else:
        # linear penalty as you drift outside
        if value < low:
            drift = (low - value) / max(low, 1)
        else:
            drift = (value - high) / max(high, 1)
        score = max(0.0, 100.0 - drift * 100.0)
        status = "warn" if score >= 55 else "unsafe"
    return {
        "key": key, "label": b["label"], "value": value, "unit": b["unit"],
        "safe_low": low, "safe_high": high, "score": round(score, 1), "status": status,
    }

@api_router.post("/quality/predict")
async def quality_predict(req: WaterTestRequest):
    params = req.model_dump()
    details = [_param_score(k, v) for k, v in params.items()]
    # weight (chloramines & THMs are health critical)
    weights = {
        "ph": 1.0, "hardness": 0.7, "solids": 1.0, "chloramines": 1.4,
        "sulfate": 0.8, "conductivity": 0.9, "organic_carbon": 1.0,
        "trihalomethanes": 1.4, "turbidity": 1.2,
    }
    ws = sum(weights.values())
    overall = round(sum(d["score"] * weights[d["key"]] for d in details) / ws, 1)
    potable = overall >= 70 and not any(d["status"] == "unsafe" for d in details)
    if overall >= 85:
        verdict = "Excellent — safe & delicious 💧"
        tone = "success"
    elif overall >= 70:
        verdict = "Good — drinkable, mind the flagged params 🌊"
        tone = "good"
    elif overall >= 50:
        verdict = "Fair — filter recommended before drinking 🧪"
        tone = "warn"
    else:
        verdict = "Poor — do NOT drink without treatment ⚠️"
        tone = "bad"

    flagged = [d for d in details if d["status"] != "safe"]
    recs = []
    for f in flagged:
        if f["key"] == "ph":
            recs.append("Adjust pH with a neutralizer or use an RO system with remineralization.")
        elif f["key"] == "hardness":
            recs.append("High hardness — install an ion-exchange water softener.")
        elif f["key"] == "solids":
            recs.append("High TDS — a reverse osmosis (RO) filter will help significantly.")
        elif f["key"] == "chloramines":
            recs.append("Chloramines are elevated — use a catalytic carbon filter.")
        elif f["key"] == "sulfate":
            recs.append("Reduce sulfate via RO or distillation.")
        elif f["key"] == "conductivity":
            recs.append("High conductivity often signals dissolved salts — RO recommended.")
        elif f["key"] == "organic_carbon":
            recs.append("Organic carbon high — activated carbon block filter helps.")
        elif f["key"] == "trihalomethanes":
            recs.append("Trihalomethanes elevated — activated carbon or aeration.")
        elif f["key"] == "turbidity":
            recs.append("High turbidity — sediment pre-filter before other treatments.")
    if not recs:
        recs.append("All parameters look great. Keep monitoring quarterly!")

    return {
        "overall": overall,
        "potable": potable,
        "verdict": verdict,
        "tone": tone,
        "details": details,
        "recommendations": recs,
    }

SAMPLE_TESTS = [
    {"name": "Clean Mountain Spring", "ph": 7.2, "hardness": 150, "solids": 320, "chloramines": 2.1,
     "sulfate": 180, "conductivity": 420, "organic_carbon": 1.6, "trihalomethanes": 42, "turbidity": 2.1},
    {"name": "City Tap Water", "ph": 7.8, "hardness": 220, "solids": 610, "chloramines": 3.6,
     "sulfate": 260, "conductivity": 720, "organic_carbon": 2.4, "trihalomethanes": 68, "turbidity": 3.4},
    {"name": "Well Water (Untreated)", "ph": 6.2, "hardness": 380, "solids": 980, "chloramines": 5.2,
     "sulfate": 340, "conductivity": 1050, "organic_carbon": 3.1, "trihalomethanes": 95, "turbidity": 6.8},
]

@api_router.get("/quality/samples")
async def quality_samples():
    return {"samples": SAMPLE_TESTS}

MARINE_LIFE = [
    {"id": "jellyfish", "name": "Moon Jellyfish", "zone": "Epipelagic (0–200m)", "fact": "Moon jellies drift with currents and glow softly under UV light. They have no brain or heart.", "img": "https://images.unsplash.com/photo-1548058308-ecbfef50cca5?crop=entropy&cs=srgb&fm=jpg&q=85"},
    {"id": "coral", "name": "Coral Reef Colony", "zone": "Sunlit Zone (0–50m)", "fact": "Coral reefs cover <1% of the ocean floor but host ~25% of all marine species.", "img": "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?crop=entropy&cs=srgb&fm=jpg&q=85"},
    {"id": "tropical", "name": "Tropical Reef Fish", "zone": "Sunlit Zone (0–50m)", "fact": "Coral fish use vibrant colors to camouflage among corals & signal mates.", "img": "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?crop=entropy&cs=srgb&fm=jpg&q=85"},
    {"id": "jellyswarm", "name": "Bioluminescent Swarm", "zone": "Mesopelagic (200–1000m)", "fact": "Many deep-sea jellies emit blue-green light to lure prey or startle predators.", "img": "https://images.unsplash.com/photo-1637308106444-e4a8b915ee3d?crop=entropy&cs=srgb&fm=jpg&q=85"},
]

OCEAN_ZONES = [
    {"name": "Sunlit (Epipelagic)", "depth": "0–200 m", "note": "Photosynthesis thrives; ~90% of marine species live here."},
    {"name": "Twilight (Mesopelagic)", "depth": "200–1000 m", "note": "Bioluminescence rules; very little sunlight penetrates."},
    {"name": "Midnight (Bathypelagic)", "depth": "1000–4000 m", "note": "Total darkness, near-freezing, immense pressure."},
    {"name": "Abyss (Abyssopelagic)", "depth": "4000–6000 m", "note": "Sparse life adapted to extreme cold and pressure."},
    {"name": "Trenches (Hadal)", "depth": "6000–11000 m", "note": "Deepest trenches — pressure up to 1100 atmospheres."},
]

@api_router.get("/marine/life")
async def marine_life():
    return {"items": MARINE_LIFE, "zones": OCEAN_ZONES}

QUIZ = [
    {"id": 1, "q": "Approximately what % of Earth's water is fresh & drinkable?", "options": ["70%", "25%", "3%", "0.5%"], "answer": 3, "hint": "Most fresh water is locked in ice."},
    {"id": 2, "q": "Which ocean is the largest?", "options": ["Atlantic", "Indian", "Pacific", "Arctic"], "answer": 2, "hint": "It borders Asia and the Americas."},
    {"id": 3, "q": "Bioluminescent creatures glow using which reaction?", "options": ["Photosynthesis", "Luciferin + Luciferase", "Combustion", "Fusion"], "answer": 1, "hint": "It's a chemical reaction."},
    {"id": 4, "q": "Ideal pH for drinking water is around:", "options": ["3.0", "5.5", "7.2", "9.5"], "answer": 2, "hint": "Neutral-ish, slightly alkaline."},
]

@api_router.get("/marine/quiz")
async def marine_quiz():
    return {"quiz": QUIZ}

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
