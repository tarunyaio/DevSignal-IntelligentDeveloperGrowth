# DevPlatform (Working Name)

> **A GitHub-native developer intelligence layer that turns activity into actionable growth.**

---

## Problem Statement

Developers today operate across fragmented tools:

* Code: GitHub
* Learning: YouTube / Docs
* Notes: Notion
* Tracking: Nowhere

Result:

* No visibility into progress
* No structured growth
* High context switching

---

## Proposed Solution

DevPlatform connects directly to GitHub and transforms raw activity into:

* Structured analytics
* Growth signals
* Actionable next steps
* Organized learning resources

---

## Core Philosophy

```text
Code -> Signals -> Insights -> Actions -> Growth
```

This is **not**:

* A code hosting platform
* A full IDE
* A social network

This is:

> **A developer growth engine built on real work.**

---

# Architecture Overview

```text
                ┌──────────────────────┐
                │      Frontend        │
                │  React + Vite + TS   │
                └─────────┬────────────┘
                          │
                          ▼
                ┌──────────────────────┐
                │     Backend API      │
                │   Fastify + Node     │
                └─────────┬────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  GitHub API  │  │  Supabase DB │  │    Redis     │
│ (Octokit)    │  │  (Postgres)  │  │   (Cache)    │
└──────────────┘  └──────────────┘  └──────────────┘
```

---

# Authentication Flow

Uses **Supabase GitHub OAuth**

```text
User clicks "Login with GitHub"
        ↓
Redirect to GitHub OAuth
        ↓
User grants permission
        ↓
Supabase receives auth code
        ↓
Supabase exchanges for access token
        ↓
Session created
        ↓
Frontend gets GitHub access token
```

---

# Data Flow (Critical Backbone)

```text
Frontend
   ↓
Backend (/sync)
   ↓
GitHub API (Octokit)
   ↓
Process + Aggregate Data
   ↓
Store in DB (Supabase)
   ↓
Frontend reads from DB (NOT GitHub)
```

---

# Tech Stack

## Frontend

* React + Vite
* TypeScript (strict)
* Tailwind CSS
* shadcn/ui
* React Router
* TanStack Query

---

## Backend

* Fastify
* Octokit (GitHub SDK)
* Redis (Upstash) for caching and rate limiting

---

## Database

* Supabase (PostgreSQL)

---

## Authentication

* Supabase GitHub OAuth

---

# Core Features (v1)

## 1. Analytics Dashboard

* Repository overview
* Language breakdown
* Contribution insights
* Activity summary

---

## 2. Resource Library

* Save learning resources
* Tagging and filtering
* Personal ratings

---

## 3. Lightweight Code Editor

* Monaco-based editor
* Code execution (basic functionality)
* Snippet saving

---

# GitHub Data Synchronization

### Initial Synchronization

```text
User logs in
   ↓
Backend fetches:
   - Repositories
   - Languages
   - Contributions
   ↓
Stores in Database
```

---

### Incremental Synchronization

```text
User revisits dashboard
   ↓
Check cache freshness
   ↓
Refresh in background if stale
```

---

# Backend API Design

## Synchronization

```http
POST /sync
```

---

## Data Retrieval

```http
GET /repos
GET /repos/:id
GET /analytics
```

---

## Editor Execution

```http
POST /execute
```

---

# Data Model (Simplified)

```text
User
 ├── githubId
 ├── username
 ├── skillLevel
 └── createdAt

Repo
 ├── name
 ├── stars
 ├── forks
 ├── language
 └── lastUpdated

Analytics
 ├── contributionData
 ├── languageStats
 └── streaks

Resource
 ├── title
 ├── url
 ├── tags
 └── rating
```

---

# Caching Strategy

| Data          | Strategy        |
| ------------- | --------------- |
| Repositories  | Cache 10–30 min |
| Languages     | Cache per repo  |
| Contributions | Refresh daily   |

---

### Logic

```text
If cache exists and is fresh:
    return cached data
Else:
    fetch from GitHub
    store in database
    return data
```

---

# User Flow

## 1. Landing Page (`/`)

* Product explanation
* Login with GitHub

---

## 2. Authentication

* GitHub OAuth via Supabase

---

## 3. Onboarding (Initial)

* Skill level setup
* Goal setting

---

## 4. Initial Synchronization

```text
"Synchronizing your GitHub data..."
```

---

## 5. Dashboard

* Repository list
* Statistics
* Activity overview

---

## 6. Repository Detail

```text
/dashboard -> /repo/:id
```

* Languages
* Contributors
* Issues

---

## 7. Resource Library

* Add, filter, and search resources

---

## 8. Code Editor

* Writing, running, and saving code

---

# Project Structure

```text
devplatform/
├── src/
│   ├── services/
│   ├── hooks/
│   ├── stores/
│   ├── pages/
│   └── components/
├── server/
│   ├── routes/
│   └── jobs/
├── prisma/
├── supabase/
```

---

# Key Design Decisions

## 1. Minimal direct GitHub calls from frontend

Communication is centralized through the backend.

---

## 2. No Personal Access Tokens

Security is maintained through OAuth with no manual token input.

---

## 3. Database-first rendering

The frontend primarily reads from the database to ensure performance.

---

## 4. Minimal editor

Focused on core editing without terminal or filesystem access.

---

# Project Risk Mitigation

| Risk               | Mitigation           |
| ------------------ | -------------------- |
| GitHub rate limits | Aggressive caching   |
| Slow dashboard     | Precompute data      |
| Scope creep        | Strict v1 scope      |
| Token revocation   | Handle 401 and re-auth |

---

# Project Roadmap

## Phase 1 (v1)

* Analytics
* Resources
* Editor

---

## Phase 2 (v2)

* Organization intelligence
* Learning paths
* Webhooks

---

## Phase 3 (v3)

* AI Assistant (context-aware)

---

# Local Setup

```bash
git clone https://github.com/TarunyaProgrammer/DevSignal-IntelligentDeveloperGrowth.git
cd devplatform
npm install
```

### Start Frontend

```bash
npm run dev
```

### Start Backend

```bash
cd server
npm run dev
```
