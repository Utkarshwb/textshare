# TextShare

A minimal paste-sharing app built with Node.js, Express, PostgreSQL, and Drizzle ORM.

## Features
- Create short-lived text pastes with custom codenames
- View pastes at shareable URLs
- Auto-expiry support (`expiresAt`)
- Markdown rendering in view page

## Tech Stack
- Node.js + Express
- PostgreSQL (Supabase-compatible)
- Drizzle ORM + Drizzle Kit
- Plain HTML/CSS/JS frontend

## Project Structure
- [backend/index.js](backend/index.js) — Express app entry point
- [backend/routes/paste.js](backend/routes/paste.js) — API routes
- [backend/db/index.js](backend/db/index.js) — DB client setup
- [backend/db/schema.js](backend/db/schema.js) — Drizzle schema
- [api/index.js](api/index.js) — Vercel serverless entry
- [frontend/index.html](frontend/index.html) — create/share page
- [frontend/view.html](frontend/view.html) — paste view page
- [drizzle.config.js](drizzle.config.js) — Drizzle config
- [vercel.json](vercel.json) — Vercel route/function config

## Prerequisites
- Node.js 20+
- pnpm
- PostgreSQL database URL

## Environment Variables
Create a local `.env` file:

```env
PORT=3000
DATABASE_URL=postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE
```

If your DB password contains special characters like `@`, URL-encode them (e.g. `@` -> `%40`).

## Install
```bash
pnpm install
```

## Run in Development
```bash
pnpm dev
```

App will run on `http://localhost:3000` (or your `PORT`).

## Database Setup (Drizzle)
Push schema to DB:

```bash
pnpm db:push
```

## Production Start
```bash
pnpm start
```

## API
### `POST /api/paste`
Create a paste.

Body:
```json
{
  "code": "my-codename",
  "content": "your text"
}
```

### `GET /api/paste/:codename`
Fetch a paste by codename.

### `DELETE /api/cleanup`
Delete expired pastes.

## Deploy (Render)
This repo includes [render.yaml](render.yaml).

1. Push repo to GitHub
2. Create a new Render service from the repo (or use Blueprint)
3. Add env var in Render dashboard:
   - `DATABASE_URL` (real value)
4. Deploy
5. Run `pnpm db:push` once against production DB

## Deploy (Vercel)
This repo is now Vercel-ready.

1. Push repo to GitHub
2. Import project in Vercel
3. Set environment variable in Vercel Project Settings:
  - `DATABASE_URL` (production DB URL)
4. Deploy

Notes:
- Routes are handled by [vercel.json](vercel.json)
- Serverless entry is [api/index.js](api/index.js)
- `PORT` is not required on Vercel

## Security Notes
- Never commit `.env`
- Rotate database credentials if they were exposed
- Keep `DATABASE_URL` only in deployment environment variables
