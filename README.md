# AYUDISHA — AI-Powered Ayurveda IPR & Regulatory Intelligence Platform

> **Where Ayurveda Meets IPR & Regulation**

AYUDISHA is a multilingual, evidence-grounded AI platform designed to transform complex Ayurvedic intellectual property (IPR) evaluation and regulatory compliance into a seamless **Guided 6-Stage Research Journey**.

---

## 🌟 Core UX Transformation & Design Principle

AYUDISHA follows a strict **Guided Research Workspace** methodology:

> **One Stage → One Primary Task → One Primary Action → One Clear Result → One Next Step**

Instead of overwhelming researchers with disconnected AI tools, AYUDISHA organizes 17 backend intelligence engines behind a simple, intuitive workflow:

```
┌─────────────────────────────────────────────────────────────────────────┐
│ AYUDISHA                                 India ▾   English ▾   Help   ◯ │
├─────────────────────────────────────────────────────────────────────────┤
│  ✓ 1 Research → 2 Analyze → ○ 3 IPR & TK → ○ 4 Regulation               │
│               → ○ 5 Verify → ○ 6 Dossier                                │
├─────────────────┬───────────────────────────────────────────────────────┤
│ WORKSPACE       │                                                       │
│ Product Overview│                 MAIN WORKSPACE                        │
│ Findings        │                                                       │
│ Evidence        │          Current Stage Task & Results                 │
│ Action Plan     │                                                       │
│                 │                                                       │
│ RESEARCH        │                                                       │
│ SUMMARY         │                                                       │
│ Product • Stage │                                                       │
└─────────────────┴───────────────────────────────────────────────────────┘
```

---

## 🚀 The 6-Stage Guided Journey

### 1. RESEARCH
- **Purpose:** *"What are you researching?"*
- **Features:** Define formulation name, botanical/Sanskrit ingredients (`Curcuma longa + Azadirachta indica`), intended therapeutic claims, and development stage (`Formulation`, `In-Vitro`, `Pre-Clinical`, `Market-Ready`).
- **Primary Action:** `[ Analyze Product → ]`

### 2. ANALYZE
- **Purpose:** *"What exactly is this product?"*
- **Primary Results:**
  - **Product Classification:** Automated statutory classification (*Proprietary Ayurvedic Medicine* under Rule 161 of Drugs & Cosmetics Rules 1945).
  - **Formulation Fingerprint:** Normalized chemical-botanical profile (`fp-8F92A1`) mapping Sanskrit, Botanical, and Common terminology.
- **Primary Action:** `[ Check IPR & TK → ]`

### 3. IPR & TRADITIONAL KNOWLEDGE (TKDL)
- **Purpose:** *"Could existing knowledge or intellectual property affect this product?"*
- **Conceptual Categories:**
  - **Traditional Knowledge (TKDL):** Matches classical literature (e.g., Charaka Samhita polyherbal formulations).
  - **Prior Art:** Identifies patent overlaps (e.g., WIPO / IP India applications).
  - **IPR Conflicts:** Highlights non-patentability exceptions under **Section 3(p)** (traditional knowledge duplication) and **Section 3(e)** (synergistic combination proof).
- **Primary Action:** `[ Check Regulation → ]`

### 4. REGULATION
- **Purpose:** *"What regulatory pathway applies?"*
- **Features:**
  - **Current Product Pathway:** Visual flow (*Product → Classification → Regulatory Framework → Authority → Required Actions*).
  - **Progressive Compliance Checklist:** Interactive tracking for SLA AYUSH Form 25D licensing.
  - **Scenario Simulator:** Interactive *"WHAT IF?"* simulator comparing India (AYUSH), USA (FDA DSHEA), and EU (EMA) pathways.
- **Primary Action:** `[ Verify Evidence → ]`

### 5. VERIFY
- **Purpose:** *"How reliable and complete is the research?"*
- **Features:**
  - **Evidence Integrity:** Categorizes evidence as *Supported*, *Needs Review*, or *Missing*.
  - **Contradiction Detector:** Identifies conflicts between Section 3(p) prior art and Section 3(e) claims.
  - **Research Gaps & Uncertainty Map:** Highlights missing empirical bioassays and heavy-metal testing data.
- **Primary Action:** `[ Build Dossier → ]`

### 6. DOSSIER
- **Purpose:** *"What did we discover and what should I investigate next?"*
- **Features:** Unified final verified research dashboard with a unique cryptographic **Audit Trail ID** (`AYU-XXXXXX`), actionable recommended next steps, and multi-format exports.
- **Primary Exports:** `[ Download PDF ]`, `[ Export Markdown ]`, `[ Export JSON ]`

---

## 🌐 Key Innovations

### 1. Multilingual Support (10 Natively Supported Languages)
AYUDISHA supports 10 languages dynamically across UI headers, steppers, sidebar, form fields, and AI responses:
- 🇬🇧 English (`en`)
- 🇮🇳 हिंदी - Hindi (`hi`)
- 🇮🇳 தமிழ் - Tamil (`ta`)
- 🇮🇳 తెలుగు - Telugu (`te`)
- 🇮🇳 മലയാളം - Malayalam (`ml`)
- 🇮🇳 ಕನ್ನಡ - Kannada (`kn`)
- 🇮🇳 বাংলা - Bengali (`bn`)
- 🇮🇳 मराठी - Marathi (`mr`)
- 🇮🇳 ગુજરાતી - Gujarati (`gu`)
- 🇮🇳 संस्कृतम् - Sanskrit (`sa`)

### 2. Persistent Floating AI Chatbot Widget (`💬 Ask AYUDISHA AI`)
- Always accessible at the bottom-right corner across all 6 stages.
- Grounded in retrieved statutory acts (Indian Patents Act 1970, Drugs & Cosmetics Act 1940, Biological Diversity Act 2002, FSSAI Ayurveda-Aahar Regulations 2022).
- Provides live citations via the **Source Evidence Modal**.

### 3. Transparent "Why?" AI Reasoning Engine
Every major AI conclusion includes a `Why?` button that displays the step-by-step visual deduction trail:  
`Your Question → Research Intent → Retrieved Sources → Relevant Evidence → Verification → Conclusion`

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, jsPDF, html2canvas |
| **Backend** | FastAPI, Uvicorn, Python 3.12, Pydantic v2, SQLAlchemy, aiosqlite |
| **AI / RAG** | LangChain, LangGraph, Sentence-Transformers, Ollama, Qdrant Client |
| **Data Sources** | TKDL, IP India Patent Gazette, WIPO PatentScope, AYUSH SLA Rules, FSSAI 2022 |

---

## 💻 Getting Started

### Prerequisites
- **Node.js**: v18+ (v24 recommended)
- **Python**: v3.10+ (v3.12 recommended)

### 1. Backend Setup & Server Execution
```bash
# Navigate to project root
cd e:/Projects/SIH/sihh-main

# Install Python dependencies
pip install -r backend/requirements.txt

# Run FastAPI backend server (Port 8000)
python backend/main.py
```
*Backend API will run at `http://localhost:8000` with Swagger docs at `http://localhost:8000/docs`.*

### 2. Frontend Setup & Dev Server
```bash
# Install Node dependencies
npm install

# Run Vite development server (Port 5173)
npm run dev
```
*Frontend application will run at `http://localhost:5173/`.*

### 3. Production Build
```bash
npm run build
```

---

## 📁 Repository Structure

```text
sihh-main/
├── backend/
│   ├── app/
│   │   ├── api/             # FastAPI router & REST endpoints
│   │   ├── core/            # Configuration & async database setup
│   │   ├── evidence/        # Evidence retrieval & missing gap analysis
│   │   ├── formulation/     # Chemical-botanical fingerprinting engine
│   │   ├── ingestion/       # Statutory seed data ingestion pipeline
│   │   ├── models/          # SQLAlchemy database models
│   │   └── services/        # RAG, chat, and comparison services
│   ├── main.py              # Backend entry point
│   └── requirements.txt     # Python dependencies
├── src/
│   ├── components/          # Guided 6-stage view components & modals
│   │   ├── Header.tsx       # Top bar & 6-stage horizontal stepper
│   │   ├── Sidebar.tsx      # Workflow navigation & persistent summary
│   │   ├── FloatingChatbot.tsx # Persistent multilingual AI widget
│   │   ├── StartResearchView.tsx    # Stage 1: Research
│   │   ├── ProductAnalyzeStageView.tsx # Stage 2: Analyze
│   │   ├── IPRAndTKStageView.tsx    # Stage 3: IPR & TK
│   │   ├── RegulatoryStageView.tsx  # Stage 4: Regulation
│   │   ├── VerificationStageView.tsx # Stage 5: Verify
│   │   └── DossierStageView.tsx     # Stage 6: Dossier
│   ├── data/                # Botanical & statutory data
│   ├── utils/
│   │   └── translations.ts  # Multilingual translations (10 languages)
│   ├── App.tsx              # Main application shell
│   └── main.tsx             # React DOM entry point
├── index.html               # Main HTML entry point
├── package.json             # Node dependencies & scripts
└── vite.config.ts           # Vite configuration
```

---

## ⚖️ Disclaimer

AYUDISHA provides source-grounded research guidance based on retrieved statutory laws and classical text databases. It is designed to assist researchers and legal personnel but does not constitute formal legal advice.
