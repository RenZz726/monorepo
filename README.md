# Learning Sandbox: Firebase + Express + Frontend + Supabase

This repository is a hands-on learning project focused on:
- Firebase (Auth, Firestore, Remote Config)
- Backend development with Express.js
- Frontend skills with Vue 3 + Vite
- Expanding to Supabase workflows over time

Current apps:
- `apps/web-app`: Vue 3 + Vite frontend
- `apps/api-server`: Express API that serves demo todo data

## Project Structure

```text
.
├── apps/
│   ├── web-app/
│   └── api-server/
├── package.json
└── package-lock.json
```

## Prerequisites

- Node.js `^20.19.0 || >=22.12.0` (web app engine requirement)
- npm (workspace support; npm 9+ recommended)

## Install Dependencies

From the repository root:

```bash
npm install
```

## Run the Apps

Open two terminals from the repository root.

1. Start the API server (Express on `http://localhost:3000`):

```bash
npm run dev:server
```

2. Start the web app (Vite on `http://localhost:5173`):

```bash
npm run dev:client
```

The API CORS configuration currently allows requests from `http://localhost:5173`.

## Available Root Scripts

- `npm run dev:server` - Run backend in watch mode (`nodemon`)
- `npm run dev:client` - Run frontend dev server
- `npm run dev` - Alias for `dev:server`
- `npm run build:client` - Build frontend for production

## API

- `GET /todos` -> returns an in-memory todo list

Base URL in local development: `http://localhost:3000`

## Learning Focus

- Implement and test Firebase auth/data flows
- Build backend APIs with Express.js
- Practice frontend architecture and UI improvements
- Compare Firebase and Supabase patterns as the project evolves

## Notes

- Firebase config is currently defined directly in `apps/web-app/src/firebase.js`.
- Dashboard fetches todos from `http://localhost:3000/todos`.
- If you change frontend/backend ports, update:
  - API CORS origin in `apps/api-server/src/app.js`
  - frontend fetch URL in `apps/web-app/src/views/Dashboard.vue`
