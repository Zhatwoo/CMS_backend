# CMS Backend

Express API for the CMS e-commerce platform. Pair with the frontend in [`Cms_E_commerce`](../Cms_E_commerce).

## Setup

```bash
npm install
# Create .env — see config/env.js for required vars (JWT_SECRET, FIREBASE_*)
npm run dev
```

- Default URL: `http://localhost:5000` (falls back to `5001` if busy)
- Health check: `GET /api/health`

## Environment (minimum)

| Variable | Required |
|----------|----------|
| `JWT_SECRET` | Yes |
| `FIREBASE_PROJECT_ID` | Yes |
| `FIREBASE_CLIENT_EMAIL` | Yes |
| `FIREBASE_PRIVATE_KEY` | Yes |
| `CORS_ORIGIN` | For frontend origin (e.g. `http://localhost:3000`) |
| `FRONTEND_URL` | Email links and CORS |

## Docker

Requires a `.env` file in the project root (same as local setup — do not change `PORT=5000`).

```bash
# Build and run (foreground)
docker compose up --build
# or
npm run docker:up

# Background
docker compose up -d --build

# Stop
npm run docker:down
```

- API URL: `http://localhost:6000` (host port mapped to container port 5000)
- Health check: `GET http://localhost:6000/api/health`
- **Frontend (required):** set `NEXT_PUBLIC_API_URL=http://localhost:6000` in the frontend repo (replace `http://localhost:5000`)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Nodemon dev server |
| `npm start` | Production server |
| `npm run docker:up` | Build and run via Docker Compose |
| `npm run docker:down` | Stop Docker Compose services |
