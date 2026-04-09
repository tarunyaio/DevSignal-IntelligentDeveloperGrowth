# DevSignal — Setup Guide

## Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project
- A GitHub OAuth app configured in Supabase (Authentication > Providers > GitHub)

---

## Quick Start

### 1. Install dependencies

```bash
# Frontend
npm install

# Backend
cd server && npm install
```

### 2. Environment Variables

**Frontend** — create `.env` in root:
```bash
cp .env.example .env
# Fill in VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_API_URL
```

**Backend** — create `.env` in `server/`:
```bash
cd server && cp .env.example .env
# Fill in SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, GITHUB_TOKEN
```

### 3. Database Setup

Run the SQL migration in your Supabase SQL Editor:
```
supabase/migrations/001_initial_schema.sql
```

This creates all tables (repositories, profiles, snippets, resources, sync_history) with Row Level Security policies and an auto-profile trigger.

### 4. Run Development Servers

```bash
# Frontend (from root)
npm run dev

# Backend (from server/)
cd server && npm run dev
```

Frontend: http://localhost:5173  
Backend: http://localhost:3001

---

## Quality Gates

### Pre-commit (Husky + lint-staged)
- Auto-runs `eslint --fix` and `tsc -b` on staged files
- Blocks commits with lint or type errors

### Testing (Vitest)
```bash
npm run test        # Run all tests once
npm run test:watch  # Interactive watch mode
```

### Linting & Type Checking
```bash
npm run lint        # ESLint
npm run type-check  # TypeScript compiler check
```

---

## 🤝 Contributing to Intelligence

We use specialized GitHub templates to maintain project standards.

### Issue Templates
- **Bug Report**: Use this for "Intelligence Loss" (logic bugs).
- **Feature Request**: Use this to suggest "New Signals."
- **Aesthetic Enhancement**: **[PREMIUM]** Use this for UI polish, motion, and glassmorphism refinements.

### Pull Requests
All PRs must pass the **Visual Impact Checklist** defined in our `PULL_REQUEST_TEMPLATE.md`. Ensure you've verified the "Motion & Interaction" feel before submitting.

---

## 🧠 Core Architecture Note
The project is split into:
- `/src`: React + Framer Motion + Tailwind (Frontend)
- `/server`: Fastify + Supabase + Octokit (Data Engine)

Always ensure your types are aligned between these two layers by running `npm run type-check` from the root.
