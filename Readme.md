<div align="center">

# 🤖 DG Project

### AI-Powered Healthcare Screening Platform

Modern healthcare triage powered by Artificial Intelligence.

[Overview](#-overview) •
[Highlights](#-highlights) •
[Architecture](#-architecture) •
[Tech Stack](#-tech-stack) •
[Getting Started](#-getting-started) •
[Future Improvements](#-future-improvements)

</div>

---

## ✨ Overview

DG Project is a modern full-stack healthcare platform designed to streamline patient pre-screening through secure authentication, structured data management, and AI-assisted analysis.

The goal is not to replace medical professionals, but to improve the first layer of patient interaction by organizing information, highlighting possible concerns, and supporting a more efficient screening workflow.

Built with a production-oriented mindset, the project combines a clean user experience with a scalable architecture and a modern TypeScript stack.

---

## 🚀 Highlights

- 🤖 AI-assisted symptom analysis powered by Gemini
- 🔐 Secure authentication and user management with Clerk
- ⚡ High-performance API built with Fastify
- 🗄️ Type-safe database layer using Drizzle ORM
- 📱 Responsive and modern user experience
- 🔄 Full-stack TypeScript architecture
- 🏗️ Scalable project structure designed for maintainability

---

## 🎯 Project Vision

Healthcare systems often struggle with the initial triage stage due to limited time, growing demand, and fragmented patient information.

DG Project explores how artificial intelligence can support this stage by helping users describe symptoms more clearly, organize relevant data, and improve communication between patients and healthcare teams.

Rather than acting as a diagnostic tool, the platform is positioned as a decision-support and intake layer for a smarter healthcare workflow.

---

## 🏛 Architecture

```text
┌─────────────┐
│   Next.js   │
│ Frontend UI │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Fastify   │
│   REST API  │
└──────┬──────┘
       │
 ┌─────┴─────┐
 ▼           ▼
PostgreSQL  Gemini AI
 (Drizzle)  Analysis
```

---

## 🛠 Tech Stack

### Frontend
- TypeScript
- Next.js
- React
- Tailwind CSS
- shadcn/ui
- Clerk Authentication

### Backend
- Node.js
- Fastify
- TypeScript
- Drizzle ORM
- PostgreSQL

### AI
- Google Gemini

### DevOps & Tooling
- Git
- npm
- ESLint
- Prettier

---

## 🔑 Key Features

### AI Symptom Analysis
Users can describe symptoms and receive an AI-assisted preliminary assessment.

### Secure Authentication
Authentication flow powered by Clerk for a safer and cleaner user experience.

### Patient Data Management
Structured storage and retrieval of user information through a type-safe database layer.

### Modern Dashboard Experience
Responsive interface focused on clarity, usability, and accessibility.

### Scalable API Design
Backend architecture built to support maintainability and future growth.

---

## 🖼 Preview

Add screenshots, dashboard previews, authentication screens, and AI interaction examples here.

```md
![Dashboard](./docs/dashboard.png)
![AI Analysis](./docs/ai-analysis.png)
![Authentication](./docs/auth.png)
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js
- npm or pnpm
- PostgreSQL database
- Google Gemini API key
- Clerk project credentials

### Environment Variables
Create a `.env` file in the backend and frontend according to your setup.

Example variables:

```env
DATABASE_URL=
GEMINI_API_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
```

### Installation

```bash
# Clone the repository
git clone https://github.com/DaviC18/Dg-project.git

# Enter the project
cd Dg-project

# Install dependencies
npm install
```

### Run the application

```bash
# Start backend
cd server
npm run dev

# Start frontend
cd ../web
npm run dev
```

---

## 📈 Future Improvements

- Appointment scheduling
- Medical history timeline
- Multi-language support
- Doctor dashboard
- Analytics and reporting
- AI conversation history
- Mobile application

---

## 💡 What This Project Demonstrates

This project highlights practical experience with:

- Full-stack development
- Software architecture
- Authentication systems
- Database design
- AI integration
- REST API development
- Modern frontend engineering
- TypeScript ecosystem

---

## ⚡ Performance & Scalability

- Type-safe backend and frontend architecture
- Modular service-oriented structure
- Optimized API communication
- Secure authentication workflows
- Extensible database schema
- Ready for future cloud deployment

---

## 👨‍💻 Author

### Davi Curty

Full-Stack Developer focused on building modern web applications, scalable systems, and AI-powered experiences.

- GitHub: https://github.com/DaviC18
- LinkedIn: https://www.linkedin.com/in/david-curty-84b2a0285?utm_source=share_via&utm_content=profile&utm_medium=member_android

---

## ⭐ Why This Project Matters

DG Project is more than a technical exercise.

It represents the combination of modern software engineering, artificial intelligence, and user-centered design to solve real-world healthcare challenges.

The project demonstrates the ability to design, architect, and implement a complete full-stack application using technologies commonly adopted in production environments.
