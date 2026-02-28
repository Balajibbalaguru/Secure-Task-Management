# 🔐 Secure Task Management

A full-stack, production-ready **Task Management** application featuring secure JWT-based authentication, a modern animated React frontend, and a RESTful Express/MongoDB backend — all written in TypeScript end-to-end.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Features](#-features)
- [Architecture](#-architecture)
- [API Reference](#-api-reference)
- [Data Models](#-data-models)
- [Authentication Flow](#-authentication-flow)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [Frontend Pages & Components](#-frontend-pages--components)
- [State Management](#-state-management)
- [Swagger API Docs](#-swagger-api-docs)
- [Scripts Reference](#-scripts-reference)
- [Security Considerations](#-security-considerations)
- [License](#-license)

---

## 🌐 Overview

Secure Task Management is a modern, full-stack web application where **authenticated users can create, view, update, and delete their own personal tasks**. The application ensures complete data isolation — users can only access tasks they own. The frontend is built with React 19, Vite, and TailwindCSS v4 with smooth Framer Motion animations, while the backend provides a clean REST API backed by Express 5 and MongoDB.

---

## 🛠 Tech Stack

### Frontend (`/client`)

| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI Framework |
| TypeScript | 5.9 | Type Safety |
| Vite | 7 | Build Tool & Dev Server |
| TailwindCSS | 4 | Styling |
| Framer Motion | 12 | Animations & Transitions |
| React Router DOM | 7 | Client-side Routing |
| TanStack React Query | 5 | Server State Management |
| Zustand | 5 | Client State Management |
| Axios | 1 | HTTP Client |
| React Hook Form | 7 | Form Handling |
| Zod | 4 | Schema Validation |
| Shadcn/UI + Radix UI | — | Accessible UI Primitives |
| Lucide React | — | Icons |
| Sonner | 2 | Toast Notifications |
| date-fns | 4 | Date Formatting |

### Backend (`/server`)

| Technology | Version | Purpose |
|---|---|---|
| Node.js | 20+ | Runtime |
| TypeScript | 5.9 | Type Safety |
| Express | 5 | Web Framework |
| MongoDB + Mongoose | 9 | Database & ODM |
| JSON Web Token | 9 | Authentication |
| bcryptjs | 3 | Password Hashing |
| Swagger UI Express | 5 | API Documentation |
| tsx | 4 | TypeScript Execution |
| dotenv | 17 | Environment Config |
| CORS | 2 | Cross-Origin Requests |

---

## 📁 Project Structure

```
Secure Task Management/
├── client/                        # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/              # Auth-related components
│   │   │   │   └── ProtectedRoute.tsx
│   │   │   ├── layout/            # Layout components
│   │   │   │   └── Navbar.tsx
│   │   │   ├── task/              # Task-related components
│   │   │   │   ├── TaskCard.tsx
│   │   │   │   ├── TaskForm.tsx
│   │   │   │   ├── TaskList.tsx
│   │   │   │   └── TaskStats.tsx
│   │   │   └── ui/                # Shadcn/Radix UI primitives
│   │   │       ├── button.tsx
│   │   │       ├── card.tsx
│   │   │       ├── dialog.tsx
│   │   │       ├── input.tsx
│   │   │       └── ...
│   │   ├── hooks/
│   │   │   ├── use-mobile.ts      # Responsive breakpoint hook
│   │   │   └── use-tasks.ts       # Task CRUD query/mutation hooks
│   │   ├── lib/
│   │   │   ├── axiosInstance.ts   # Axios instance with interceptors
│   │   │   ├── queryClient.ts     # TanStack Query client config
│   │   │   └── utils.ts           # Utility functions (cn, etc.)
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx      # Animated login page
│   │   │   ├── RegisterPage.tsx   # Animated registration page
│   │   │   └── DashboardPage.tsx  # Main task management view
│   │   ├── services/
│   │   │   ├── auth.service.ts    # Auth API calls
│   │   │   └── task.service.ts    # Task API calls
│   │   ├── stores/
│   │   │   └── auth.store.ts      # Zustand auth state (persisted)
│   │   ├── types/
│   │   │   ├── auth.ts            # Auth-related TypeScript types
│   │   │   └── task.ts            # Task-related TypeScript types
│   │   ├── App.tsx                # Root component with router
│   │   ├── main.tsx               # Application entry point
│   │   └── index.css              # Global styles & Tailwind
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── server/                        # Express Backend
│   └── src/
│       ├── config/
│       │   ├── db.ts              # MongoDB connection
│       │   └── swagger.ts         # Swagger/OpenAPI spec config
│       ├── constants/
│       │   └── http.ts            # HTTP status code constants
│       ├── controllers/
│       │   ├── auth.controller.ts # Register, Login, GetMe handlers
│       │   └── task.controller.ts # CRUD task handlers
│       ├── lib/
│       │   ├── response.ts        # Standardized API response helpers
│       │   ├── token.ts           # JWT sign/verify utilities
│       │   └── ...
│       ├── middleware/
│       │   └── auth.middleware.ts # JWT protect middleware
│       ├── models/
│       │   ├── user.model.ts      # Mongoose User schema
│       │   └── task.model.ts      # Mongoose Task schema
│       ├── routes/
│       │   ├── auth.routes.ts     # Auth route definitions + Swagger docs
│       │   └── task.routes.ts     # Task route definitions + Swagger docs
│       ├── types/
│       │   └── ...                # Extended Express Request types
│       └── index.ts               # Server entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
└── README.md
```

---

## ✨ Features

### 🔒 Authentication
- **User Registration** — Sign up with name, email, and password
- **User Login** — Authenticate with email & password
- **JWT Access + Refresh Tokens** — Short-lived access tokens (7d) and long-lived refresh tokens (30d)
- **Password Hashing** — All passwords hashed with bcryptjs before storage
- **Protected Routes** — Frontend route guard using `ProtectedRoute` component
- **Persistent Sessions** — Auth state persisted to `localStorage` via Zustand middleware
- **Auto-redirect** — Unauthenticated users redirected to `/login` automatically

### ✅ Task Management
- **Create Tasks** — Add tasks with a title and optional description
- **View Tasks** — See all your personal tasks in a clean card layout
- **Update Tasks** — Edit title, description, and toggle completion status
- **Delete Tasks** — Remove tasks you no longer need
- **User Isolation** — Tasks are scoped to the authenticated user; no cross-user data access
- **Real-time UI** — Optimistic updates with TanStack React Query cache invalidation

### 🎨 UI/UX
- **Animated Pages** — Framer Motion page transitions and form field animations
- **Glassmorphism Design** — Modern dark UI with blurred glass-effect cards
- **Responsive Layout** — Fully mobile-friendly with a responsive hook (`use-mobile.ts`)
- **Toast Notifications** — Sonner toasts for success/error feedback
- **Form Validation** — Client-side validation with React Hook Form + Zod schemas
- **Accessible Components** — Radix UI primitives ensure keyboard navigation & ARIA compliance

### 📖 API Documentation
- **Swagger UI** — Interactive API docs served at `http://localhost:3000/api-docs`
- **OpenAPI JSON** — Machine-readable spec at `http://localhost:3000/api-docs.json`
- **Documented Schemas** — All request/response bodies documented with examples

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────┐
│                  CLIENT (React + Vite)               │
│                                                     │
│  ┌──────────┐   ┌────────────┐   ┌───────────────┐  │
│  │  Pages   │──▶│  Services  │──▶│  Axios (HTTP) │  │
│  │ Login    │   │ auth.svc   │   │  Interceptors  │  │
│  │ Register │   │ task.svc   │   │  (JWT attach)  │  │
│  │Dashboard │   └────────────┘   └───────┬───────┘  │
│  └──────────┘                            │           │
│  ┌──────────┐   ┌────────────┐           │           │
│  │  Stores  │   │TanStack    │           │           │
│  │ Zustand  │   │React Query │           │           │
│  │ (Auth)   │   │ (Tasks)    │           │           │
│  └──────────┘   └────────────┘           │           │
└──────────────────────────────────────────┼──────────┘
                                           │ REST API
┌──────────────────────────────────────────▼──────────┐
│                  SERVER (Express 5)                  │
│                                                     │
│  ┌──────────────┐   ┌──────────────┐                 │
│  │  Auth Routes │   │  Task Routes │                 │
│  │  POST /login │   │  GET /tasks  │                 │
│  │  POST /reg.  │   │  POST /tasks │                 │
│  │  GET /me     │   │  PUT /tasks  │                 │
│  └──────┬───────┘   │  DEL /tasks  │                 │
│         │           └──────┬───────┘                 │
│  ┌──────▼───────────────────▼───────┐                │
│  │       Auth Middleware (JWT)       │                │
│  └──────────────────┬───────────────┘                │
│  ┌──────────────────▼───────────────┐                │
│  │          Controllers             │                │
│  └──────────────────┬───────────────┘                │
│  ┌──────────────────▼───────────────┐                │
│  │        Mongoose Models           │                │
│  └──────────────────┬───────────────┘                │
└─────────────────────┼──────────────────────────────┘
                      │
        ┌─────────────▼──────────────┐
        │      MongoDB Database      │
        │   Collections: users,tasks │
        └────────────────────────────┘
```

---

## 📡 API Reference

All API responses follow a consistent envelope format:

**Success:**
```json
{ "success": true, "data": { ... } }
```

**Error:**
```json
{ "success": false, "message": "Error description" }
```

### Auth Endpoints (`/api/auth`)

| Method | Endpoint | Auth Required | Description |
|--------|----------|:---:|-------------|
| `POST` | `/api/auth/register` | ❌ | Register a new user |
| `POST` | `/api/auth/login` | ❌ | Log in and receive tokens |
| `GET` | `/api/auth/me` | ✅ | Get the current authenticated user |

#### `POST /api/auth/register`

**Request Body:**
```json
{
  "name": "[USER_NAME]",
  "email": "[EMAIL_ADDRESS]",
  "password": "secret123"
}
```

**Response `201`:**
```json
{
  "success": true,
  "data": {
    "user": { "_id": "...", "name": "[USER_NAME]", "email": "[EMAIL_ADDRESS]" },
    "accessToken": "eyJhbGci...",
    "refreshToken": "eyJhbGci..."
  }
}
```

#### `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "[EMAIL_ADDRESS]",
  "password": "secret123"
}
```

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "user": { "_id": "...", "name": "[USER_NAME]", "email": "[EMAIL_ADDRESS]" },
    "accessToken": "eyJhbGci...",
    "refreshToken": "eyJhbGci..."
  }
}
```

#### `GET /api/auth/me`
```
Headers: Authorization: Bearer <accessToken>
```
**Response `200`:**
```json
{
  "success": true,
  "data": {
    "user": { "_id": "...", "name": "[USER_NAME]", "email": "[EMAIL_ADDRESS]" }
  }
}
```

---

### Task Endpoints (`/api/tasks`)

> ⚠️ **All task endpoints require a valid JWT Bearer token.**

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tasks` | Get all tasks for the authenticated user |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/:id` | Update a task by ID |
| `DELETE` | `/api/tasks/:id` | Delete a task by ID |

#### `GET /api/tasks`

**Response `200`:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
      "title": "Buy groceries",
      "description": "Milk, eggs, bread",
      "completed": false,
      "userId": "64f1a2b3c4d5e6f7a8b9c0d0",
      "createdAt": "2025-02-25T10:00:00.000Z",
      "updatedAt": "2025-02-25T10:00:00.000Z"
    }
  ]
}
```

#### `POST /api/tasks`

**Request Body:**
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```

**Response `201`:**
```json
{
  "success": true,
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "completed": false,
    "userId": "64f1a2b3c4d5e6f7a8b9c0d0",
    "createdAt": "2025-02-25T10:00:00.000Z",
    "updatedAt": "2025-02-25T10:00:00.000Z"
  }
}
```

#### `PUT /api/tasks/:id`

**Request Body** *(any combination of fields)*:
```json
{
  "title": "Buy groceries (updated)",
  "description": "Also get juice",
  "completed": true
}
```

**Response `200`:**
```json
{
  "success": true,
  "data": { "...updated task fields..." }
}
```

#### `DELETE /api/tasks/:id`

**Response `200`:**
```json
{
  "success": true,
  "data": null
}
```

---

## 🗃 Data Models

### User Model

```typescript
{
  _id:       ObjectId,      // Auto-generated MongoDB ID
  name:      string,        // 2–50 characters, required
  email:     string,        // Unique, lowercase, required
  password:  string,        // Hashed via bcryptjs, min 6 chars
  createdAt: Date,          // Auto-managed by Mongoose
  updatedAt: Date           // Auto-managed by Mongoose
}
```

> 🔒 The `password` field is **automatically stripped** from all JSON responses via a `toJSON` transform — it is never sent to the client.

### Task Model

```typescript
{
  _id:         ObjectId,    // Auto-generated MongoDB ID
  title:       string,      // 1–200 characters, required
  description: string,      // 0–1000 characters, default: ""
  completed:   boolean,     // Default: false
  userId:      ObjectId,    // Reference to User._id (required)
  createdAt:   Date,        // Auto-managed by Mongoose
  updatedAt:   Date         // Auto-managed by Mongoose
}
```

> 📊 A **compound index** on `{ userId, createdAt }` (descending) is applied for efficient per-user task queries sorted by creation time.

---

## 🔑 Authentication Flow

```
1. Register / Login
   Client ──POST /api/auth/login──▶ Server
   Server validates credentials,
   hashes password, signs JWT tokens
   Server ◀── { user, accessToken, refreshToken } ──

2. Store Tokens
   Zustand store (persisted) saves:
   - user object
   - accessToken → localStorage
   - refreshToken → localStorage

3. Authenticated Requests
   Axios interceptor automatically attaches:
   Authorization: Bearer <accessToken>

4. Protected Route Guard
   <ProtectedRoute /> checks Zustand `isAuthenticated`
   → If false, redirects to /login

5. Sign Out
   clearAuth() removes tokens from localStorage
   and resets Zustand state
   React Query cache is invalidated
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** v20 or higher — [nodejs.org](https://nodejs.org)
- **npm** v10 or higher (bundled with Node.js)
- **MongoDB** — either:
  - Local installation: [mongodb.com/try/download](https://www.mongodb.com/try/download/community)
  - Or a free cloud instance: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git**

---

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/Balajibbalaguru/Secure-Task-Management.git
cd "Secure Task Management"
```

**2. Install server dependencies**
```bash
cd server
npm install
```

**3. Install client dependencies**
```bash
cd ../client
npm install
```

---

### Environment Variables

#### Server (`/server/.env`)

Create a `.env` file in the `server/` directory:

```env
# Server
PORT=3000
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb://localhost:27017/secure-task-management

# JWT Access Token
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=7d

# JWT Refresh Token
JWT_REFRESH_SECRET=your_super_secret_refresh_key_change_in_production
JWT_REFRESH_EXPIRES_IN=30d
```

> ⚠️ **Security Warning:** Never commit real secret values to version control. Replace the placeholder secrets with long, randomly generated strings before deploying to production. You can generate a strong secret with:
> ```bash
> node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
> ```

#### Client (`/client/.env`)

Create a `.env` file in the `client/` directory:

```env
VITE_API_URL=http://localhost:3000
```

---

### Running the App

Open **two terminal windows** and run each part concurrently:

**Terminal 1 — Start the Backend Server:**
```bash
cd server
npm run dev
```
The server will start on `http://localhost:3000`

**Terminal 2 — Start the Frontend Dev Server:**
```bash
cd client
npm run dev
```
The client will start on `http://localhost:5173`

**Access the application:**
- 🌐 **App:** [http://localhost:5173](http://localhost:5173)
- 📖 **Swagger API Docs:** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- 📄 **OpenAPI JSON:** [http://localhost:3000/api-docs.json](http://localhost:3000/api-docs.json)

---

## 🖥 Frontend Pages & Components

### Pages

| Page | Route | Description |
|------|-------|-------------|
| `LoginPage` | `/login` | Animated login with email/password form |
| `RegisterPage` | `/register` | Registration form with name, email, password + confirm password |
| `DashboardPage` | `/dashboard` | Task management — view, create, update, delete tasks |

### Key Components

| Component | Location | Description |
|-----------|----------|-------------|
| `ProtectedRoute` | `components/auth/` | Guards routes; redirects unauthenticated users to `/login` |
| `Navbar` | `components/layout/` | Top navigation bar; adapts to auth-page (logo only) vs app (with sign-out) |
| `TaskCard` | `components/task/` | Individual task card with complete/delete controls |
| `TaskForm` | `components/task/` | Dialog form for creating and editing tasks |
| `TaskList` | `components/task/` | Scrollable list of all task cards |
| `TaskStats` | `components/task/` | Summary stats: total, completed, pending counts |

---

## 🗂 State Management

The application uses two complementary state solutions:

### Zustand — Client/Auth State (`auth.store.ts`)

Manages the authentication state with persistence to `localStorage`:

```typescript
{
  user: User | null          // Logged-in user object
  accessToken: string | null // JWT access token
  refreshToken: string | null // JWT refresh token
  isAuthenticated: boolean   // Boolean flag for auth guard

  setAuth(user, accessToken, refreshToken): void  // Called on login/register
  clearAuth(): void                               // Called on logout
}
```

### TanStack React Query — Server State (`use-tasks.ts`)

Manages async task data with automatic caching and invalidation:

- `useGetTasks()` — Fetches all user tasks; caches result under `['tasks']`
- `useCreateTask()` — Creates a task and invalidates the `['tasks']` cache
- `useUpdateTask()` — Updates a task and invalidates the `['tasks']` cache
- `useDeleteTask()` — Deletes a task and invalidates the `['tasks']` cache

---

## 📖 Swagger API Docs

The backend ships with fully integrated **Swagger UI** for interactive API exploration. All endpoints are documented with:

- Request body schemas and examples
- Response codes and schemas (200, 201, 400, 401, 403, 404, 409)
- Bearer token authentication (use the "Authorize" button in Swagger UI)
- Reusable `$ref` components for `User`, `Task`, `SuccessResponse`, `ErrorResponse`

**Access Swagger UI:** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 📜 Scripts Reference

### Server (`/server`)

| Script | Command | Description |
|--------|---------|-------------|
| Development | `npm run dev` | Start server with `tsx watch` (hot-reload) |
| Build | `npm run build` | Compile TypeScript to `dist/` |
| Production | `npm run start` | Run compiled production build |

### Client (`/client`)

| Script | Command | Description |
|--------|---------|-------------|
| Development | `npm run dev` | Start Vite dev server with HMR |
| Build | `npm run build` | Type-check + create production bundle |
| Preview | `npm run preview` | Preview the production build locally |
| Lint | `npm run lint` | Run ESLint on all TypeScript/React files |

---

## 🔐 Security Considerations

| Concern | Implementation |
|---------|---------------|
| **Password Storage** | Passwords are hashed with `bcryptjs` — plain-text passwords are never stored |
| **Password Exposure** | `toJSON` transform on `UserModel` removes the `password` field from all responses |
| **Authentication** | JWT-based with separate access (7d) and refresh (30d) tokens |
| **Authorization** | Task ownership is verified server-side — users can only read/update/delete their own tasks (HTTP 403 otherwise) |
| **Input Validation** | Mongoose schema enforces field types, lengths, and required fields server-side; Zod enforces client-side |
| **Environment Secrets** | All secrets loaded from `.env` — never hardcoded in source code |
| **CORS** | CORS middleware enabled on the Express server |
| **Token Transmission** | Tokens sent via `Authorization: Bearer` header, not cookies (no CSRF risk in this setup) |

---

