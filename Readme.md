<div align="center">

# 🩺 Doctor Genesis

### AI-Powered Healthcare Pre-Screening Platform

**Doctor Genesis** is a full-stack healthcare technology project designed to support patient intake, symptom organization, and AI-assisted preliminary analysis.

The platform helps users submit structured symptom information and generates an AI-assisted pre-diagnostic report that can support healthcare professionals during the first layer of clinical screening.

> Doctor Genesis does **not** replace doctors, medical diagnosis, emergency care, or professional clinical evaluation.
> It is designed as a support tool for organizing information and improving the pre-screening workflow.

<br />

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge\&logo=next.js\&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)
![Fastify](https://img.shields.io/badge/Fastify-5-000000?style=for-the-badge\&logo=fastify\&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=for-the-badge\&logo=postgresql\&logoColor=white)
![Drizzle](https://img.shields.io/badge/Drizzle-ORM-C5F74F?style=for-the-badge)
![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge\&logo=clerk\&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini-AI-4285F4?style=for-the-badge\&logo=google\&logoColor=white)

</div>

---

## 📌 Table of Contents

* [Overview](#-overview)
* [Project Purpose](#-project-purpose)
* [Main Features](#-main-features)
* [Live Architecture](#-live-architecture)
* [Tech Stack](#-tech-stack)
* [Monorepo Structure](#-monorepo-structure)
* [Application Flow](#-application-flow)
* [API Routes](#-api-routes)
* [AI Response Structure](#-ai-response-structure)
* [Database Overview](#-database-overview)
* [Security and Privacy](#-security-and-privacy)
* [Environment Variables](#-environment-variables)
* [Running Locally](#-running-locally)
* [Deployment](#-deployment)
* [Testing](#-testing)
* [Roadmap](#-roadmap)
* [Medical Disclaimer](#-medical-disclaimer)
* [Author](#-author)

---

## ✨ Overview

Doctor Genesis is a modern full-stack application that combines healthcare intake workflows with artificial intelligence.

The system allows authenticated users to fill out a structured symptom form. After submission, the backend stores the form data and sends the relevant information to an AI model, which generates a structured preliminary analysis.

The generated report includes:

* A short clinical-style title
* Summary of the reported symptoms
* Alerts
* Suggestions for the physician
* Suggested exams
* Observations
* Urgency level
* Safety notice
* Recommended next step

The goal is to help organize patient information before a professional evaluation.

---

## 🎯 Project Purpose

Healthcare systems often face challenges during the initial intake stage:

* Unstructured symptom descriptions
* Missing patient information
* Long waiting times
* Difficulty organizing initial reports
* Repetitive manual screening processes
* Communication gaps between patient and healthcare professional

Doctor Genesis explores how artificial intelligence can support this first step by transforming raw symptom information into a more organized and readable preliminary report.

The system is not a diagnostic authority. Instead, it acts as a digital pre-screening and information organization layer.

---

## 🚀 Main Features

### 🧠 AI-Assisted Pre-Diagnostic Report

Doctor Genesis uses Gemini to generate structured preliminary analysis based on patient-provided information.

The AI response is designed to be controlled and organized, avoiding free-form unsafe medical output.

---

### 📝 Structured Symptom Form

The patient form collects relevant information such as:

* Symptom description
* Start date
* Symptom evolution
* Pain or discomfort level
* Previous occurrence
* Previous professional guidance
* Consent confirmation

This helps reduce missing information and improves the quality of the initial intake.

---

### 🔐 Authentication with Clerk

The application uses Clerk for user authentication and session management.

Authenticated routes ensure that users can only access their own forms and pre-diagnostic records.

---

### 🗂️ Pre-Diagnostic History

Users can access a list of previous AI-assisted pre-diagnostics.

Each pre-diagnostic can be opened individually through a dynamic detail page.

---

### 📄 Pre-Diagnostic Detail Page

The detail page displays the complete AI-generated report, including:

* Clinical summary
* Alerts
* Physician suggestions
* Suggested exams
* Observations
* Urgency classification
* Next step
* Original form data

---

### ⚙️ API-Driven Architecture

The project separates frontend and backend responsibilities:

* The frontend handles the user interface.
* The backend handles authentication, validation, database operations, and AI integration.

This separation improves maintainability and makes the project easier to scale.

---

### 🌐 Production Deployment

The project was deployed using a split architecture:

* Frontend deployed on Vercel
* Backend deployed on Render
* Database hosted on Neon
* Authentication handled by Clerk
* AI processing handled by Gemini

---

## 🧱 Live Architecture

```txt
User
 │
 ▼
Vercel
Next.js Frontend
 │
 │ HTTPS Fetch
 ▼
Render
Fastify API
 │
 ├── Clerk Authentication
 ├── PostgreSQL / Neon
 └── Gemini AI
```

---

## 🛠️ Tech Stack

## Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Clerk
* Radix UI
* shadcn/ui
* Lucide React
* Vitest
* Biome

## Backend

* Node.js
* Fastify
* TypeScript
* Zod
* Drizzle ORM
* PostgreSQL
* Neon
* Clerk Fastify
* Google Gemini API
* Pino Logger
* Vitest
* Ultracite
* tsup

## Database

* PostgreSQL
* Neon serverless database
* Drizzle ORM for type-safe queries and schema management

## AI

* Google Gemini
* Structured JSON response validation
* AI-assisted clinical pre-screening output

## Deployment

* Vercel for the frontend
* Render for the backend API
* Neon for PostgreSQL
* Clerk Dashboard for authentication configuration

---

## 📁 Monorepo Structure

```txt
Dg-project/
│
├── web/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── lib/
│   │
│   ├── public/
│   ├── package.json
│   └── next.config.ts
│
├── server/
│   ├── src/
│   │   ├── db/
│   │   │   ├── schema/
│   │   │   └── connections.ts
│   │   │
│   │   ├── http/
│   │   │   └── routes/
│   │   │       ├── forms/
│   │   │       └── preDiagnostics/
│   │   │
│   │   ├── services/
│   │   │   └── gemini.ts
│   │   │
│   │   ├── lib/
│   │   ├── env.ts
│   │   └── server.ts
│   │
│   ├── drizzle.config.ts
│   ├── package.json
│   └── tsconfig.json
│
├── README.md
└── .github/
```

---

## 🔄 Application Flow

```txt
1. User signs in with Clerk
2. User opens the Doctor Genesis form
3. User submits symptoms and clinical context
4. Frontend sends the form to the Fastify API
5. Backend validates authentication and request body
6. Backend saves the form in PostgreSQL
7. Frontend requests AI pre-diagnostic generation
8. Backend checks form ownership
9. Backend sends structured data to Gemini
10. Gemini returns a structured preliminary analysis
11. Backend validates and stores the AI result
12. User can view the result in the list and detail pages
```

---

## 🔌 API Routes

Base URL in production:

```txt
https://dg-server-tb54.onrender.com
```

Local development URL:

```txt
http://localhost:3333
```

---

### Health Check

```http
GET /
```

Expected response:

```txt
ok
```

---

### Create Form

```http
POST /forms
```

Authentication required.

Request body:

```json
{
  "symptomsDescription": "Headache and fever since yesterday.",
  "startDate": "2026-06-21",
  "symptomsStatus": "worse",
  "painLevel": 7,
  "hadBefore": false,
  "hadBeforeWhen": null,
  "seenByProfessional": false,
  "seenByWho": null,
  "consent": true
}
```

Main validations:

* User must be authenticated.
* Consent must be true.
* Required fields must be valid.
* Form belongs to the authenticated user.

---

### Get Forms

```http
GET /forms
```

Authentication required.

Returns the authenticated user's forms.

---

### Create Pre-Diagnostic

```http
POST /pre-diagnostics
```

Authentication required.

Request body:

```json
{
  "formId": "uuid-from-created-form"
}
```

Main validations:

* User must be authenticated.
* Form must exist.
* Form must belong to the authenticated user.
* A form should not generate duplicated pre-diagnostics.

---

### Get Pre-Diagnostics

```http
GET /pre-diagnostics
```

Authentication required.

Returns all pre-diagnostics from the authenticated user.

---

### Get Pre-Diagnostic by ID

```http
GET /pre-diagnostics/:id
```

Authentication required.

Returns a single pre-diagnostic by ID if it belongs to the authenticated user.

---

## 🧠 AI Response Structure

The AI response is designed to follow a predictable structure.

```ts
type PreDiagnosticResult = {
  title: string;
  summary: string;
  alerts: string[];
  suggestionsToTheDoctor: string[];
  examsSuggested: string[];
  observations: string[];
  urgencyLevel: "low" | "medium" | "urgent" | "life_threatening";
  safetyNotice: string | null;
  nextStep: string;
};
```

---

## 🚨 Urgency Levels

Doctor Genesis uses controlled urgency levels:

```txt
low
medium
urgent
life_threatening
```

These levels help organize the AI output visually, but they do not replace medical triage performed by a qualified healthcare professional.

---

## 🗄️ Database Overview

The project uses PostgreSQL with Drizzle ORM.

Main entities:

---

### forms

Stores patient-submitted symptom information.

Example fields:

```txt
id
userId
symptomsDescription
startDate
symptomsStatus
painLevel
hadBefore
hadBeforeWhen
seenByProfessional
seenByWho
consent
createdAt
```

---

### pre_diagnostics

Stores AI-generated preliminary reports.

Example fields:

```txt
id
formId
userId
title
urgencyLevel
model
result
analysisStatus
createdAt
```

Relationship:

```txt
forms.id → pre_diagnostics.formId
```

A form can be connected to its generated AI-assisted pre-diagnostic.

---

## 🔐 Security and Privacy

Doctor Genesis handles sensitive health-related information, so the project follows important security principles:

* Authentication is required for protected actions.
* Users can only access their own records.
* API keys are kept on the backend.
* Environment variables are not committed to the repository.
* AI generation happens on the server side.
* CORS is restricted to allowed frontend origins.
* The system requires user consent before form submission.
* The project includes medical disclaimers to avoid misuse.

---

## ⚖️ LGPD and Data Protection Considerations

Health-related information is considered sensitive personal data.

A production-ready version of Doctor Genesis should include:

* Privacy Policy
* Terms of Use
* Data deletion flow
* Data retention rules
* Audit logs
* Encryption strategies
* Access control policies
* Clear consent management
* Medical and legal review before real-world use

---

## 🔑 Environment Variables

## Backend Environment Variables

Create a `.env` file inside `server/`.

```env
NODE_ENV=development
PORT=3333

DATABASE_URL="postgresql://user:password@host/database?sslmode=require"

CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here

GEMINI_API_KEY=your_gemini_api_key_here

JWT_SECRET_KEY=your_jwt_secret_here

FRONTEND_URLS=http://localhost:3000,http://localhost:5173
```

For production on Render:

```env
NODE_ENV=production
NODE_VERSION=22

DATABASE_URL=your_neon_database_url

CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

GEMINI_API_KEY=your_gemini_api_key

JWT_SECRET_KEY=your_jwt_secret

FRONTEND_URLS=https://your-vercel-domain.vercel.app
```

---

## Frontend Environment Variables

Create a `.env.local` file inside `web/`.

```env
NEXT_PUBLIC_API_URL=http://localhost:3333

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here
```

For production on Vercel:

```env
NEXT_PUBLIC_API_URL=https://your-render-api.onrender.com

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

Important:

```txt
Never expose secret keys with NEXT_PUBLIC_.
Only variables that must be available in the browser should use NEXT_PUBLIC_.
```

---

## 🧪 Running Locally

Clone the repository:

```bash
git clone https://github.com/DaviC18/Dg-project.git
cd Dg-project
```

---

## Start the Backend

```bash
cd server
npm install
npm run dev
```

Backend local URL:

```txt
http://localhost:3333
```

Health check:

```txt
http://localhost:3333/
```

---

## Start the Frontend

Open another terminal:

```bash
cd web
npm install
npm run dev
```

Frontend local URL:

```txt
http://localhost:3000
```

---

## 🏗️ Production Build

## Backend

Recommended production scripts:

```json
{
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsup src/server.ts --format esm --platform node --target node22 --out-dir dist --clean",
    "start": "node dist/server.js"
  }
}
```

Run:

```bash
cd server
npm run build
npm start
```

---

## Frontend

```bash
cd web
npm run build
npm start
```

---

## 🌍 Deployment

## Frontend on Vercel

Recommended settings:

```txt
Framework Preset: Next.js
Branch: master
Root Directory: web
Install Command: npm install
Build Command: npm run build
Output Directory: empty / default
```

Environment variables:

```env
NEXT_PUBLIC_API_URL=https://your-render-api.onrender.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

---

## Backend on Render

Recommended settings:

```txt
Language: Node
Branch: master
Root Directory: server
Build Command: npm install --include=dev && npm run build
Start Command: npm start
```

Environment variables:

```env
NODE_ENV=production
NODE_VERSION=22
DATABASE_URL=your_neon_database_url
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET_KEY=your_jwt_secret
FRONTEND_URLS=https://your-vercel-domain.vercel.app
```

---

## 🌐 CORS Configuration

The backend must allow the frontend origin.

Example:

```ts
const allowedOrigins: string[] =
  process.env.FRONTEND_URLS
    ?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean) ?? [];

app.register(fastifyCors, {
  origin: allowedOrigins,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true,
});
```

Example production value:

```env
FRONTEND_URLS=https://dg-web-delta.vercel.app
```

Example local value:

```env
FRONTEND_URLS=http://localhost:3000,http://localhost:5173
```

---

## 🧬 Clerk Configuration

After deployment, configure Clerk with the production frontend URL.

Add your frontend domain to:

```txt
Allowed Origins
Redirect URLs
After Sign In URL
After Sign Up URL
```

Example:

```txt
https://your-vercel-domain.vercel.app
```

For local development:

```txt
http://localhost:3000
```

---

## 🧠 Gemini Integration

The AI service receives structured form data and returns a controlled JSON output.

Core safety principles:

* The AI does not provide definitive diagnosis.
* The AI response must be interpreted as preliminary.
* The response should be reviewed by a qualified healthcare professional.
* Emergency symptoms must be directed to urgent medical evaluation.
* The system output is designed for support, not autonomous decision-making.

---

## 🧾 Example Pre-Diagnostic Output

```json
{
  "title": "Headache with fever",
  "summary": "The user reports headache and fever that started yesterday and worsened over time.",
  "alerts": [
    "Monitor worsening symptoms.",
    "Seek medical attention if severe symptoms occur."
  ],
  "suggestionsToTheDoctor": [
    "Ask about fever duration.",
    "Check for associated respiratory or neurological symptoms."
  ],
  "examsSuggested": [
    "Vital signs assessment",
    "Clinical evaluation"
  ],
  "observations": [
    "This is a preliminary AI-assisted analysis.",
    "It should be reviewed by a healthcare professional."
  ],
  "urgencyLevel": "medium",
  "safetyNotice": "This analysis does not replace medical evaluation.",
  "nextStep": "Schedule a professional medical evaluation."
}
```

---

## 🧪 Testing

The project includes testing tools with Vitest.

Backend:

```bash
cd server
npm run test
npm run test:run
npm run test:coverage
```

Frontend:

```bash
cd web
npm run test
npm run test:run
npm run test:coverage
```

Suggested test coverage:

* Authentication validation
* Form creation
* Form ownership
* Pre-diagnostic creation
* Duplicate pre-diagnostic prevention
* AI service success flow
* AI service failure flow
* Protected route access
* Error states in frontend hooks
* UI rendering for unauthenticated users

---

## 🧹 Code Quality

The project uses tools such as Biome and Ultracite for formatting and code quality.

Backend:

```bash
cd server
npm run check
npm run fix
```

Frontend:

```bash
cd web
npm run lint
npm run format
```

---

## 🧭 Project Highlights

This project demonstrates practical experience with:

* Full-stack TypeScript development
* REST API design
* Authentication architecture
* Protected routes
* PostgreSQL database modeling
* ORM usage with Drizzle
* AI integration with Gemini
* Structured JSON validation
* Frontend state management
* UX for loading, error, and authentication states
* Monorepo deployment
* Vercel frontend deployment
* Render backend deployment
* CORS configuration
* Production environment variables
* Healthcare-oriented software design

---

## 📊 Current Project Status

```txt
Status: MVP online
Frontend: Deployed
Backend: Deployed
Database: Connected
Authentication: Connected
AI: Connected
```

Main completed milestones:

* Full-stack monorepo setup
* Patient symptom form
* Clerk authentication
* Backend API with Fastify
* PostgreSQL database with Drizzle ORM
* AI-assisted pre-diagnostic generation
* Pre-diagnostic listing page
* Pre-diagnostic detail page
* Production deploy with Vercel and Render
* CORS configuration between frontend and backend
* Medical safety notice
* UX handling for unauthenticated users

---

## 🧩 Known Limitations

Doctor Genesis is currently an MVP/prototype.

Current limitations:

* No formal clinical validation yet
* No doctor dashboard yet
* No production-grade privacy policy yet
* No data deletion panel yet
* No advanced audit log yet
* No complete medical review workflow yet
* No emergency-care integration
* No official regulatory approval
* Free backend hosting may introduce cold-start delays

---

## 🚧 Roadmap

Planned improvements:

* Doctor dashboard
* Medical review workflow
* Patient history timeline
* Appointment scheduling
* PDF export for reports
* Admin analytics dashboard
* Role-based access control
* Multi-language support
* Improved clinical safety layer
* More automated tests
* CI/CD pipeline
* Privacy Policy and Terms of Use
* Data deletion request flow
* Audit logging
* Mobile-first improvements
* Better loading state for Render cold starts
* Production monitoring and observability

---

## ⚠️ Medical Disclaimer

Doctor Genesis is not a medical device and does not provide definitive diagnosis.

The AI-generated pre-diagnostic report is preliminary and should only be used as informational support.

Users should always seek professional medical evaluation for health concerns.

In case of emergency, severe pain, fainting, difficulty breathing, rapid worsening, or any serious symptom, the user should seek urgent medical care immediately.

---

## 🔒 Security Notice

Do not commit `.env` files.

Do not expose:

```txt
CLERK_SECRET_KEY
GEMINI_API_KEY
DATABASE_URL
JWT_SECRET_KEY
```

If any secret key is accidentally exposed, rotate it immediately in the corresponding provider dashboard.

Recommended secret management:

* Clerk Dashboard for Clerk keys
* Google AI Studio or Google Cloud for Gemini keys
* Neon Dashboard for database credentials
* Render Environment Variables for backend secrets
* Vercel Environment Variables for frontend/server-side Next.js secrets

---

## 👨‍💻 Author

### Davi Valério Rocha de Souza Curty

Full-Stack Developer focused on modern web applications, scalable systems, artificial intelligence, and healthcare technology.

GitHub:

```txt
https://github.com/DaviC18
```

Project repository:

```txt
https://github.com/DaviC18/Dg-project
```

---

## ⭐ Why Doctor Genesis Matters

Doctor Genesis represents the intersection of healthcare, software engineering, and artificial intelligence.

The project shows how modern web technologies can be used to build meaningful tools that support real-world workflows, especially in areas where organization, clarity, speed, and responsible data handling are essential.

More than a coding exercise, Doctor Genesis is a practical demonstration of how AI can be integrated into a full-stack product with authentication, database persistence, structured API design, deployment, and user-centered experience.

---

<div align="center">

### Doctor Genesis

**AI-assisted healthcare pre-screening, built with modern full-stack engineering.**

</div>
