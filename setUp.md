# DevSignal — Setup & Intelligence Guide

Welcome to the **DevSignal Engine**. This document explains how to set up the environment and utilize the quality control systems we've implemented to keep the "intelligence" of the codebase at peak performance.

---

## 🚀 Quick Start

### 1. Installation
Install dependencies for both frontend and backend.

```bash
# Root directory (Frontend)
npm install

# Server directory (Backend)
cd server
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env` in the `server` directory and fill in your Supabase and GitHub credentials.

```bash
cd server
cp .env.example .env
```

### 3. Running Development
```bash
# Frontend (Root)
npm run dev

# Backend (server folder)
npm run dev
```

---

## 🛠 Quality Control Systems

We have implemented a rigorous quality gate to ensure "Visual Excellence" and "Code Integrity."

### 1. Automated Checks (Husky + lint-staged)
We use **Husky** to hook into Git lifecycle events.
- **Pre-commit**: Every time you commit, `lint-staged` runs.
- **Actions**: It will automatically run `eslint --fix` and `tsc -b` on your changed files.
- **Result**: You cannot commit code that has linting errors or type mismatches.

### 2. Testing (Vitest)
We chose **Vitest** for its speed and native Vite integration.
- **Configuration**: Managed via `vitest.config.ts`.
- **Setup**: `src/test/setup.ts` configures `jsdom` and `@testing-library/jest-dom` for component testing.
- **Commands**:
  - `npm run test`: Run all tests once.
  - `npm run test:watch`: Interactive test mode.

### 3. Linting & Type Checking
- `npm run lint`: Scans the codebase for unused variables and stylistic inconsistencies.
- `npm run type-check`: Runs the TypeScript compiler in build mode to catch deep type errors.

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
