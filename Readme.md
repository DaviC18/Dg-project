# Doctor Genesis

**AI-assisted clinical triage platform that collects patient symptoms, organizes the data, and generates a structured pre-diagnosis to support the consultation — without replacing the physician.**

## Why this project exists

Doctor Genesis was designed to reduce the time spent gathering basic information during clinical intake. The patient fills out a guided form, the backend validates and stores the data, and AI helps transform that information into a clean, structured pre-diagnosis for medical review.

The goal is simple: **speed up triage, improve organization, and keep the final decision in human hands**.

## What it does

- Collects patient symptoms, pain level, timeline, and prior history through a guided form
- Authenticates users with Clerk
- Stores records in PostgreSQL through Drizzle ORM
- Generates a preliminary diagnostic summary with Gemini
- Returns structured data for later clinical review
- Keeps the physician as the final authority on interpretation

## Key features

- **Authenticated clinical flow** — only signed-in users can create and access records
- **Structured intake** — symptom reports are validated before persistence
- **Pre-diagnosis support** — AI assists the workflow, it does not replace medical judgment
- **Separation of concerns** — frontend and backend are isolated in dedicated apps
- **Type-safe stack** — TypeScript across the project
- **Modern UI foundation** — Next.js, Tailwind CSS, and shadcn/ui on the web side

## Tech stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Clerk

### Backend
- Fastify
- TypeScript
- Zod
- Drizzle ORM
- PostgreSQL / postgres.js
- Clerk Fastify
- Gemini API

## Architecture

```text
web/    -> Next.js application for the patient/clinic interface
server/ -> Fastify API responsible for auth, validation, persistence, and AI-backed triage
```

### Data flow

1. The user signs in.
2. The user fills out the symptom form.
3. The backend validates the payload with Zod.
4. The form is stored in PostgreSQL.
5. AI processes the structured data and produces a pre-diagnosis.
6. The result is shown for medical review.

## Available API routes

The backend currently exposes routes for:

- `GET /` — health check
- `GET /me` — authenticated user lookup
- `POST /forms` — create a symptom form
- `GET /forms` — list the authenticated user’s forms
- `GET /pre-diagnostics` — list generated pre-diagnostic records

## Project structure

```text
server/
├─ src/
│  ├─ db/
│  ├─ http/routes/
│  ├─ services/
│  ├─ types/
│  ├─ utils/
│  ├─ env.ts
│  └─ server.ts
├─ drizzle.config.ts
└─ package.json

web/
├─ app/
├─ components/
├─ lib/
├─ public/
└─ package.json
```

## Environment variables

### `server/.env`

```env
PORT=5234
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET_KEY=your_jwt_secret_key
```

### `web/.env.local`

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

> Adjust the environment variables according to your deployment and Clerk configuration.

## Getting started

### 1) Clone the repository

```bash
git clone https://github.com/DaviC18/Dg-project.git
cd Dg-project
```

### 2) Install dependencies

```bash
cd server
npm install

cd ../web
npm install
```

### 3) Run the backend

```bash
cd server
npm run dev
```

### 4) Run the frontend

```bash
cd web
npm run dev
```

## Backend scripts

```bash
npm run dev         # start development server
npm run start       # run the API
npm run db:generate # generate Drizzle migrations
npm run db:migrate  # apply migrations
npm run db:seed     # seed the database
npm run check       # run Biome checks
npm run fix         # auto-fix lint/style issues
```

## Frontend scripts

```bash
npm run dev     # start Next.js in development mode
npm run build   # build for production
npm run start   # run production build
npm run lint    # run Biome checks
npm run format  # format code
```

## Highlights for recruiters

This repository demonstrates:

- **Product thinking** — solves a real operational pain point in clinical intake
- **Full-stack delivery** — frontend, backend, auth, database, and AI integration
- **Data validation discipline** — Zod + typed API contracts
- **Modular architecture** — routes, services, schemas, and UI components separated cleanly
- **Modern stack fluency** — Next.js, Fastify, Clerk, Drizzle, PostgreSQL, Gemini
- **Domain awareness** — the system supports care; it does not pretend to replace it

## Roadmap ideas

- Add audit logs for clinical traceability
- Introduce tests for critical routes and form validation
- Add role-based access for doctors, assistants, and admins
- Create dashboards with triage metrics and form status tracking
- Add export options for clinical records
- Improve observability with structured logging and request tracing

## License

No license file was found in the repository. Add one if you plan to publish or reuse the project openly.