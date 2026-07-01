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

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Nodemon dev server |
| `npm start` | Production server |
