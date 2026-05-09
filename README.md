# 🔒 Whistleblower & Ethics Hotline
### Tool-70 | Capstone Project | Sprint: 14 April – 9 May 2026

An AI-powered web application that allows employees to anonymously report unethical behavior, fraud, and policy violations.

---

## 🏗️ Architecture
┌─────────────────────────────────────────────────────┐
│                   FRONTEND (Port 80)                 │
│         React 18 + Vite + Tailwind CSS               │
│   Login · Dashboard · Reports · Analytics · Audit    │
└─────────────────────┬───────────────────────────────┘
│ HTTP/REST
┌─────────────────────▼───────────────────────────────┐
│                  BACKEND (Port 8080)                 │
│         Spring Boot 3.x + JWT + Redis Cache          │
│    REST APIs · Security · Email · Flyway Migrations  │
└──────────┬──────────────────────────┬───────────────┘
│                          │
┌──────────▼──────────┐  ┌───────────▼───────────────┐
│   PostgreSQL 15     │  │      AI Service (Port 5000) │
│   (Port 5432)       │  │   Flask + Groq LLaMA-3.3   │
│   complaints        │  │   /describe /recommend      │
│   users audit_log   │  │   /generate-report          │
└─────────────────────┘  └───────────────────────────┘
│
┌──────────▼──────────┐
│      Redis 7        │
│    (Port 6379)      │
│    Cache Layer      │
└─────────────────────┘

---

## 👥 Team

| Name | Role |
|------|------|
| Alekhya P C | Java Developer 2 |
| Spoorthi R | Java Developer 1 |
| Sanjan Gowda N J | AI Developer 1 |
| Navaneeth Raju SR | AI Developer 2 |
| Giriraju C M | Security Reviewer |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| Java 17 + Spring Boot 3.x | Backend REST API |
| React 18 + Vite + Tailwind | Frontend UI |
| PostgreSQL 15 | Primary database |
| Redis 7 | Caching layer |
| Flyway | Database migrations |
| Spring Security + JWT | Authentication |
| Python 3.11 + Flask | AI microservice |
| Groq API (LLaMA-3.3-70b) | AI model |
| Docker + Docker Compose | Containerization |

---

## ⚙️ Prerequisites

- Java 17 (adoptium.net)
- Node.js 20+
- Docker Desktop
- Git

---

## 🚀 Setup Instructions

### Step 1: Clone the repository
```bash
git clone https://github.com/alekhya-puvvadi/whistleblower-ethics-hotline.git
cd whistleblower-ethics-hotline
```

### Step 2: Create environment file
```bash
cp .env.example .env
```

Edit `.env` with your actual values:

whistleblower-ethics-hotline/
├── backend/                    # Spring Boot application
│   ├── src/main/java/com/internship/tool/
│   │   ├── controller/         # REST endpoints
│   │   ├── service/            # Business logic
│   │   ├── repository/         # DB queries
│   │   ├── entity/             # JPA models
│   │   ├── config/             # Security, Redis, JWT
│   │   └── exception/          # Custom exceptions
│   └── src/main/resources/
│       ├── db/migration/       # Flyway SQL files
│       └── application.yml     # Configuration
├── frontend/                   # React application
│   └── src/
│       ├── components/         # Reusable components
│       ├── pages/              # Page components
│       ├── services/           # API calls
│       └── context/            # Auth context
├── ai-service/                 # Flask AI microservice
├── docker-compose.yml
├── .env.example
├── SECURITY.md
└── README.md


---

## 🔒 Security Features

- JWT token authentication
- CORS protection (localhost:5173 only)
- Input validation on all forms
- Soft delete (data never lost)
- Role-based access control
- File upload validation (type + size)

See [SECURITY.md](SECURITY.md) for full details.

---

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/login | Login and get JWT token |
| GET | /api/complaints | Get all complaints (paginated) |
| POST | /api/complaints/create | Create new complaint |
| GET | /api/complaints/{id} | Get complaint by ID |
| PUT | /api/complaints/{id} | Update complaint |
| DELETE | /api/complaints/{id} | Delete complaint |
| GET | /auth/health | Backend health check |
| GET | /health | AI service health check |

---

## 🗄️ Database Migrations

| File | Description |
|------|-------------|
| V1__init.sql | Reports + users tables |
| V2__audit_log.sql | Audit log table |

---

