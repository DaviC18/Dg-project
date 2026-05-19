<div align="center">

# 🩺 Doctor Genesis

### AI-Powered Clinical Pre-Diagnostic Platform

<p align="center">
  Structured patient intake • AI-assisted triage • Clinical workflow support
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" />
  <img src="https://img.shields.io/badge/Fastify-5-000000?logo=fastify" />
  <img src="https://img.shields.io/badge/PostgreSQL-Database-316192?logo=postgresql" />
  <img src="https://img.shields.io/badge/Drizzle-ORM-0F172A" />
  <img src="https://img.shields.io/badge/AI-Gemini-orange" />
  <img src="https://img.shields.io/badge/License-ISC-yellow.svg" />
</p>

<p align="center">
  <strong>
    Turning fragmented patient reports into structured clinical insights with AI.
  </strong>
</p>

</div>

---

# 📖 Overview

Doctor Genesis is a full-stack AI-powered clinical pre-diagnostic platform designed to streamline symptom intake and assist healthcare professionals during early-stage patient evaluation.

The platform transforms unstructured patient-reported symptoms into structured clinical outputs using Google Gemini, while maintaining schema validation, authenticated workflows, and persistent medical records.

Instead of replacing medical professionals, Doctor Genesis focuses on:

- accelerating triage
- organizing symptom intelligence
- reducing intake friction
- improving consistency in early evaluations

---

# ✨ Features

## ✅ Currently Implemented

- Structured clinical intake form
- Symptom history collection
- Pain scale evaluation
- Previous occurrence tracking
- Prior medical consultation tracking
- Consent validation flow
- Clerk authentication (frontend + backend)
- Protected API routes
- AI-generated pre-diagnostic analysis
- PostgreSQL persistence layer
- Historical retrieval of forms and AI results
- JSON-structured AI output
- Responsive UI
- Mobile navigation support
- Monorepo architecture
- Drizzle ORM schema management
- Seed system for mock data

---

# 🧠 AI Workflow

```text
Patient Input
      ↓
Frontend Validation
      ↓
Authenticated API Request
      ↓
Fastify + Zod Validation
      ↓
PostgreSQL Persistence
      ↓
Gemini Clinical Analysis
      ↓
Structured JSON Response
      ↓
Pre-Diagnostic Storage
      ↓
Historical Retrieval
```

---

# 🏗️ Architecture

## Monorepo Structure

```text
Dg-project/
│
├── server/
│   ├── src/
│   │   ├── db/
│   │   ├── http/routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── types/
│   │   ├── env.ts
│   │   └── server.ts
│
├── web/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── public/
│   └── types/
```

---

# ⚙️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS 4, Radix UI, shadcn/ui |
| Backend | Fastify 5, TypeScript |
| Validation | Zod |
| Database | PostgreSQL |
| ORM | Drizzle ORM |
| AI | Google Gemini (`@google/genai`) |
| Authentication | Clerk |
| Tooling | Biome, Ultracite, TSX |
| Icons | Lucide React |

---

# 🔥 Core Technical Highlights

## Schema-Constrained AI Output

The AI response is forced into a strict JSON schema containing:

```json
{
  "summary": "",
  "alerts": [],
  "suggestionsToTheDoctor": [],
  "examsSuggested": [],
  "observations": []
}
```

This significantly reduces free-form hallucinations and makes the output easier to persist, query, validate, and render.

---

## Authentication Architecture

Doctor Genesis uses Clerk across both frontend and backend:

- Clerk middleware on frontend routes
- Bearer token authentication
- Server-side verification using `getAuth(request)`
- Protected API communication

---

## Database Design

### Main Tables

| Table | Purpose |
|---|---|
| `forms` | Stores patient intake information |
| `pre_diagnostics` | Stores AI-generated clinical analysis |

### Relationship

```text
forms
   └── pre_diagnostics
```

- One form can contain multiple AI analyses
- Foreign keys use cascade delete
- Indexed lookup for performance optimization

---

# 📸 Preview Assets

Repository assets already available:

```text
web/public/assets/images/
├── landing.png
├── landing-1.png
├── landing-2.png
├── landing-3.png
├── landing-p.png
├── form.png
├── image-ia.png
└── result.png
```

---

# 🚀 Installation

# Prerequisites

- Node.js LTS
- PostgreSQL
- Clerk account
- Gemini API key
- npm / pnpm / yarn

---

## Clone Repository

```bash
git clone https://github.com/DaviC18/Dg-project.git

cd Dg-project
```

---

## Install Dependencies

### Backend

```bash
cd server
npm install
```

### Frontend

```bash
cd ../web
npm install
```

---

# 🗄️ Database Setup

Create a PostgreSQL database and configure your `.env`.

Run migrations:

```bash
cd server

npm run db:generate
npm run db:migrate
```

Optional seed:

```bash
npm run db:seed
```

---

# 🔐 Environment Variables

## Backend `.env`

```env
PORT=5234

DATABASE_URL=postgresql://user:password@localhost:5432/doctor_genesis

CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxx

CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxx

GEMINI_API_KEY=AIzaSyxxxxxxxxxxxxxxxxx

JWT_SECRET_KEY=your_secret_key
```

---

## Frontend `.env`

```env
NEXT_PUBLIC_API_URL=http://localhost:3333

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxx
```

---

# ▶️ Running Locally

## Start Backend

```bash
cd server
npm run dev
```

---

## Start Frontend

```bash
cd web
npm run dev
```

---

# 📡 API Documentation

## Authentication

All protected routes require a Clerk bearer token.

---

## Routes

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Health check |
| `GET` | `/me` | Returns authenticated user |
| `POST` | `/forms` | Creates intake form + AI analysis |
| `GET` | `/forms` | Returns user forms |
| `GET` | `/pre-diagnostics` | Returns AI analyses |

---

## Validation

Request validation is performed using Zod schemas.

Required fields:

- `symptomsDescription`
- `startDate`
- `symptomsStatus`
- `painLevel`
- `hadBefore`
- `hadBeforeWhen`
- `seenByProfessional`
- `seenByWho`
- `consent`

---

# 🧬 AI Features

## Current AI Model

```text
gemini-3-flash-preview
```

---

## Embeddings Support

The repository also includes:

```text
gemini-embedding-2
```

for future retrieval and semantic search workflows.

---

## Reliability Considerations

Current architecture advantages:

- schema-constrained outputs
- validated persistence
- structured response formatting
- authenticated requests

Current limitations:

- synchronous AI generation
- no queue/background jobs yet
- no retry system
- no observability pipeline

---

# 🛡️ Security Considerations

## Implemented

- Clerk authentication
- Protected routes
- Zod validation
- Consent enforcement
- CORS configuration
- Foreign key integrity

## Production Improvements Recommended

- Remove debug logs
- Externalize API URLs
- Add rate limiting
- Add monitoring/telemetry
- Add audit logging
- Queue AI requests asynchronously

---

# ⚡ Performance & Scalability

## Current Strengths

- JSONB AI storage
- Indexed relational queries
- Lightweight backend architecture
- Efficient schema organization

## Bottlenecks

The main bottleneck is the synchronous Gemini request during form creation.

Future scaling path:

```text
Request Queue
    ↓
Background Workers
    ↓
AI Processing
    ↓
Result Persistence
```

---

# 🧪 Development Workflow

## Tooling

- Biome formatting
- Ultracite checks
- Drizzle migrations
- TypeScript-first architecture

---

## Scripts

### Backend

```bash
npm run dev
npm run start
npm run db:generate
npm run db:migrate
npm run db:seed
npm run check
npm run fix
```

### Frontend

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run format
```

---

# 🛣️ Roadmap

## Planned Improvements

- OpenAPI/Swagger documentation
- Async AI processing
- Background jobs
- Queue system
- Retry handling
- Role-based access
- Analytics dashboard
- Observability pipeline
- Automated testing
- Semantic search with embeddings
- Medical workflow enhancements

---

# 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Run the project locally
4. Follow formatting conventions
5. Open a pull request

---

# 📄 License

This project currently uses the ISC license declared in the backend package configuration.

---

# 👨‍💻 Author

<div align="center">

## Davi C18

Full-stack developer focused on scalable systems, AI integrations, and modern web architecture.

[GitHub](https://github.com/DaviC18)

</div>

---

<div align="center">

### ⭐ If you found this project interesting, consider starring the repository.

</div>
