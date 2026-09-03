# AquaSafe AI 💧

An immersive water-themed full-stack app featuring **Aqua** — an anime water goddess AI mascot who guides users through:

- 🤖 Gemini 3.1 Pro chatbot with streaming replies + voice narration
- 🧪 9-parameter water quality analyzer (pH, TDS, chloramines, etc.) with live mood reactions
- 🌊 Marine life encyclopedia + ocean depth zones + trivia quiz
- 💧 Daily hydration tracker with animated water glass
- 🌱 Water conservation savings calculator
- 🎴 Downloadable Aqua sticker pack (happy, worried, shocked, curious, etc.)
- 🎭 Live mood detection in chat — Aqua's face reacts to what you're saying

---

## Project Structure

```
aqua-safe-ai/
├── backend/           FastAPI + MongoDB + Gemini 3.1 Pro
│   ├── server.py
│   ├── requirements.txt
│   └── .env.example
└── frontend/          React 19 + Tailwind + shadcn/ui
    ├── src/
    │   ├── App.js
    │   ├── index.js
    │   ├── index.css
    │   ├── App.css
    │   ├── components/
    │   │   ├── AquaMascot.jsx       ← the star of the show
    │   │   ├── Header.jsx
    │   │   ├── HeroSection.jsx
    │   │   ├── ChatSection.jsx      ← streaming + voice + mood
    │   │   ├── QualitySection.jsx
    │   │   ├── MarineSection.jsx
    │   │   ├── HydrationSection.jsx
    │   │   ├── StickerSection.jsx   ← downloadable stickers
    │   │   ├── FloatingMascot.jsx
    │   │   ├── OceanCanvas.jsx
    │   │   ├── RippleCursor.jsx
    │   │   ├── WaveDivider.jsx
    │   │   └── Footer.jsx
    │   ├── pages/
    │   │   └── WaterTestPage.jsx    ← 9-param wizard
    │   ├── utils/
    │   │   ├── aquaSticker.js       ← PNG export + mood detection
    │   │   └── aquaVoice.js         ← Web Speech narration
    │   └── context/
    │       └── OutfitContext.jsx
    ├── public/index.html
    ├── package.json
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── craco.config.js
    └── .env.example
```

---

## 1. Backend setup

```bash
cd backend
python -m venv venv
source venv/bin/activate     # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env, put your MongoDB URL + Emergent LLM key
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

The Emergent LLM key (`EMERGENT_LLM_KEY`) is a universal key that unlocks OpenAI, Anthropic and Gemini through `emergentintegrations`. Get one from your Emergent profile.

MongoDB can be local (`mongodb://localhost:27017`) or MongoDB Atlas.

### API endpoints

| Method | Path                              | Purpose                          |
|--------|-----------------------------------|----------------------------------|
| POST   | `/api/chat/stream`                | SSE stream from Gemini 3.1 Pro   |
| GET    | `/api/chat/history/{session_id}`  | Chat history                     |
| DELETE | `/api/chat/history/{session_id}`  | Clear chat history               |
| POST   | `/api/hydration/add`              | Log water intake                 |
| GET    | `/api/hydration/today/{sid}`      | Today's intake                   |
| POST   | `/api/quality/analyze`            | Quick pH+TDS analysis            |
| POST   | `/api/quality/predict`            | 9-parameter potability analysis  |
| GET    | `/api/quality/samples`            | Preset water samples             |
| GET    | `/api/quality/tips`               | Conservation tips                |
| GET    | `/api/marine/life`                | Marine life + ocean zones        |
| GET    | `/api/marine/quiz`                | Ocean trivia quiz                |

---

## 2. Frontend setup

```bash
cd frontend
yarn install                         # NOT npm — this repo is yarn-only
cp .env.example .env
# Edit .env, set REACT_APP_BACKEND_URL to your backend URL
yarn start
```

Frontend runs on http://localhost:3000, backend on http://localhost:8001.
All backend routes are prefixed with `/api` so they route correctly through Kubernetes ingress in production.

---

## 3. Tech stack

**Backend**
- FastAPI 0.110 + Uvicorn
- MongoDB (Motor async driver)
- `emergentintegrations` for LLM streaming (Gemini 3.1 Pro)
- Pydantic v2 models

**Frontend**
- React 19 + React Router 7
- Tailwind CSS 3.4 + shadcn/ui radix components
- Framer Motion, Lucide-react icons, sonner toasts
- Fonts: Outfit, Plus Jakarta Sans, Fredoka
- Web Speech API for Aqua voice narration
- Web Share API for sticker sharing

---

## 4. Key features in code

- **`AquaMascot.jsx`** — single SVG mascot that supports 8 expressions (`happy`, `cheer`, `wave`, `thinking`, `guiding`, `worried`, `surprised`, `idle`) with a live waving right hand and full anime detail (hair, bow, sleeves, boots, choker, belt)
- **`ChatSection.jsx`** — SSE streaming from Gemini, incremental mood detection on partial response, voice narration toggle, session-persisted chat history
- **`WaterTestPage.jsx`** — 9-parameter wizard with live client-side scoring that mirrors backend WHO/EPA bands and drives Aqua's mood in real time
- **`StickerSection.jsx` + `utils/aquaSticker.js`** — client-side SVG→PNG converter that generates styled 720×900 sticker cards and downloads / shares them via Web Share API or clipboard
- **`utils/aquaVoice.js`** — picks the best female English voice from the browser and speaks Aqua's replies aloud

---

## 5. Environment variables

**`backend/.env`**
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=aqua_safe_ai
CORS_ORIGINS=*
EMERGENT_LLM_KEY=sk-emergent-xxxxxxxxxx
```

**`frontend/.env`**
```
REACT_APP_BACKEND_URL=http://localhost:8001
WDS_SOCKET_PORT=443
```

---

Made with droplets & dreams 💧🌊 · Mascot: Aqua · Powered by Gemini 3.1 Pro
