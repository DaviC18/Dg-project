# Doctor Genesis

> A full-stack clinical intelligence platform designed to transform raw patient input into structured, actionable pre-diagnostic insights.

---

## 🚀 Why This Project Exists

Healthcare systems often struggle with fragmented, unstructured patient data. Doctor Genesis was built to explore a critical question:

> **How can we turn raw symptom input into structured, meaningful clinical insights before a doctor even gets involved?**

This project is not just about forms and APIs — it's about designing a system that bridges the gap between user input and medical reasoning.

---

## 🧠 What It Does

Doctor Genesis simulates a real-world pre-diagnostic pipeline:

* Collects patient symptom data through a structured form
* Validates and processes input using a typed backend
* Uses Google Gemini to generate structured, context-aware pre-diagnostic insights
* Generates a structured pre-diagnostic object
* Stores results using flexible JSON-based persistence
* Enables retrieval and future analysis of diagnostic data

---

## 🏗️ Architecture Overview

This project follows a **monorepo architecture**, separating concerns while maintaining a unified system.

```bash
Doctor Genesis/
├─ web/        # Frontend (Next.js)
├─ server/     # Backend (Fastify API)
└─ README.md
```

### Design Philosophy

* **Separation of concerns** → Frontend and backend are independent but cohesive
* **Type safety everywhere** → From request validation to database layer
* **Scalability first** → Built to evolve into a more complex system

---

## ⚙️ Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Clerk (Authentication)

### Backend

* Fastify
* TypeScript
* Zod (Validation)
* Drizzle ORM
* PostgreSQL
* Clerk Auth
* AI integration with Google Gemini

---

## 🔄 Application Flow

1. User authenticates via Clerk
2. Submits a clinical form with symptoms
3. Backend validates the request using Zod
4. Data is persisted using Drizzle ORM
5. A structured pre-diagnostic is generated and stored as JSON
6. Data becomes available for retrieval and future analysis

---

## 🧪 Example Payload

```json
{
  "formId": "form_123",
  "model": "gpt-4.1",
  "result": {
    "summary": "Patient presents symptoms consistent with...",
    "alerts": "Monitor for signs of worsening condition.",
    "suggestionsToTheDoctor": "Recommend in-person evaluation.",
    "examsSuggested": "Blood tests, clinical examination, imaging if necessary.",
    "observations": "Initial data suggests the need for follow-up."
  }
}
```

---

## 🔌 API Endpoints

### `POST /pre-diagnostic`

Creates and stores a new pre-diagnostic.

### `GET /pre-diagnostic`

Retrieves all pre-diagnostics for the authenticated user.

---

## 🛠️ Getting Started

### Prerequisites

* Node.js
* PostgreSQL
* Package manager (npm, pnpm, or yarn)

### Installation

```bash
# Clone repository
git clone <REPOSITORY_URL>
cd doctor-genesis

# Frontend
cd web
npm install

# Backend
cd ../server
npm install
```

### Environment Variables

```env
DATABASE_URL=
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

### Run the Project

```bash
# Backend
cd server
npm run dev

# Frontend
cd ../web
npm run dev
```

---

## 🧩 Technical Decisions

* **Monorepo structure** → Improves developer experience and project cohesion
* **Zod validation** → Eliminates trust issues between frontend and backend
* **Drizzle ORM** → Strong typing with predictable SQL behavior
* **JSONB storage** → Flexible and future-proof diagnostic data model
* **Clerk** → Simplifies authentication without compromising security
* **Google Gemini** → Powers AI-assisted analysis for pre-diagnostic generation

---

## 🔮 Future Vision

* AI-assisted diagnostic refinement
* Clinical dashboard with analytics
* Exportable medical reports (PDF)
* Role-based access (doctor vs patient)
* Automated testing (unit + integration)
* CI/CD pipeline for production readiness

---

## 📸 Preview

> *(Add screenshots or GIFs here — this is where the project starts to sell itself)*

---

## 🧭 What This Project Demonstrates

* Ability to design and build a full-stack system
* Strong understanding of data flow and validation
* Clean separation between layers
* Real-world architecture thinking, not just isolated features

---

## 📌 Final Note

Doctor Genesis is more than a project — it's a proof of capability.

It shows not only how to build, but how to think.

---

> Built with intention. Evolving with purpose.
