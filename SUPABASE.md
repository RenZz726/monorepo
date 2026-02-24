What We Set Up
You now have Firebase + Supabase working together, with Supabase used only for backend todos.

Added Supabase backend client in apps/api-server/src/lib/supabase.js.
Updated GET /todos to read from Supabase table todo_items, with fallback in-memory data if Supabase is not configured in apps/api-server/src/modules/todos/list.js.
Added backend .env loading in apps/api-server/src/server.js.
Made backend port configurable via PORT and defaulted to 4000 in apps/api-server/src/server.js.
Added env template for backend Supabase config in apps/api-server/.env.example.
Updated frontend dashboard to call configurable backend URL (VITE_API_BASE_URL) in apps/web-app/src/views/Dashboard.vue.
Updated Dashboard behavior so todos can still render even if Firebase authorized-user check fails in apps/web-app/src/views/Dashboard.vue.
Fixed CORS to allow local dev origins dynamically (localhost/127.0.0.1 on any port) in apps/api-server/src/app.js.
Updated docs and ignore rules in README.md and .gitignore.
Final Runtime Shape

Frontend auth/data features still use Firebase.
Dashboard todo API fetch uses Express backend (/todos).
Express /todos reads from Supabase public.todo_items.
Backend uses SUPABASE_SERVICE_ROLE_KEY preferred (with anon fallback).
Mistakes You Hit (And Correct Handling)

Missing apps/api-server/.env.
How to handle: create from template and restart server.

No Supabase todo_items table initially.
How to handle: create table first in SQL editor before testing API.

Seeing fallback todos and assuming Supabase was working.
Why: fallback data looked “valid”.
How to handle: when testing integration, temporarily remove fallback or add clear log/response marker.

Port mismatch (frontend expected 3000, backend moved to 4000).
How to handle: always centralize URLs in env (PORT, VITE_API_BASE_URL) and restart both processes after changes.

EADDRINUSE on 3000.
How to handle: either free the port or choose another port consistently across backend/frontend env.

CORS origin mismatch (5173, then 5174, then 5175).
How to handle: allow-list pattern for local dev origins, not only one hardcoded origin.

Firebase auth and Supabase auth confusion.
Why: logging into Firebase does not authenticate Supabase automatically.
How to handle: for backend routes, use service-role key server-side only.

UI gate blocked todo rendering (v-else-if="isAuthorized").
How to handle: decouple “can view todos” from Firebase remote-config check if todos come from backend API.

Important Security Notes

Never expose SUPABASE_SERVICE_ROLE_KEY in frontend.
Keep it only in backend .env (already ignored in .gitignore).
Use SUPABASE_ANON_KEY only for browser-side Supabase clients.
Current Required Env

Backend apps/api-server/.env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, PORT=4000.
Frontend .env.local: localhost (line 4000).
Optional backend CORS override: CORS_ORIGINS=... (comma-separated).
Good Debug Order Next Time

Check backend process is running and on expected port.
Hit API directly (/todos) before checking UI.
Check backend logs for Supabase errors.
Check browser Network tab for CORS/status.
Check UI conditions that may hide data even when API is fine.
