# Bangalore Pincode Explorer

A production-style full-stack web app that looks up **Bangalore post offices by pincode**. Users enter a pincode starting with `560`, the Express API validates it, fetches data from the [India Post Postal Pincode API](https://api.postalpincode.in/), stores successful searches in MongoDB Atlas, and the React frontend presents results in a clean SaaS-style dashboard.

Built as a realistic internship take-home: clear architecture, maintainable layers, and an interview-friendly codebase.

---

## Features

### Core
- Search Bangalore pincodes (exactly 6 digits, numeric, must start with `560`)
- Friendly client + server validation messages
- Post office results with: Name, Area, District, State, Branch Type, Delivery Status, Circle, Region, Division
- Search history persisted in MongoDB (latest 10 successful searches)

### Frontend UX
- Search box + button + Enter-key submit
- Loading spinner and skeleton placeholders
- Empty, error, and success states
- Copy pincode button with toast feedback
- Recent searches (click to re-run)
- Dark / light mode with persistence
- Responsive layout and subtle Framer Motion animations

### Backend quality
- Controllers, routes, service layer, Mongoose models
- Validation middleware, centralized error handling
- Helmet, CORS, rate limiting, Morgan logging
- Proper HTTP status codes and `{ success, data | message }` responses

---

## Tech stack

| Layer | Stack |
| --- | --- |
| Frontend | React (Vite), Tailwind CSS, Axios, React Icons, Framer Motion |
| Backend | Node.js, Express, Mongoose, Axios, dotenv, cors, helmet, express-rate-limit, morgan |
| Database | MongoDB Atlas |
| External API | `https://api.postalpincode.in/pincode/{PINCODE}` |
| Deploy | Frontend → Vercel · Backend → Render |

---

## Architecture

```text
┌─────────────────────┐        HTTPS         ┌──────────────────────┐        HTTPS         ┌─────────────────────┐
│  React + Vite       │ ───────────────────► │  Express API         │ ───────────────────► │  India Post API     │
│  (Vercel)           │  GET /api/pincode/:pin│  (Render)            │                      └─────────────────────┘
│                     │  GET /api/history     │                      │
│  Tailwind / Motion  │ ◄─────────────────── │  Routes → Controllers│      Mongoose        ┌─────────────────────┐
└─────────────────────┘         JSON         │  → Services → Models │ ───────────────────► │  MongoDB Atlas      │
                                             └──────────────────────┘                      └─────────────────────┘
```

**Request flow**

1. User enters a pincode; the frontend validates format for instant feedback.
2. Axios calls `GET /api/pincode/:pin`.
3. Backend validation middleware enforces Bangalore rules (source of truth).
4. Service fetches India Post data, maps it to a stable DTO, and saves history on success.
5. Controller returns `{ success: true, data }`.
6. UI renders result cards; `GET /api/history` powers recent searches.

---

## Folder structure

```text
banglore/
├── backend/
│   ├── config/db.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   ├── .env.example
│   ├── package.json
│   └── vercel.json
├── render.yaml
└── README.md
```

---

## API

### `GET /api/pincode/:pin`

Returns post offices for a valid Bangalore pincode and stores a history record.

**Success (200)**

```json
{
  "success": true,
  "data": {
    "pincode": "560001",
    "totalResults": 2,
    "postOffices": [
      {
        "name": "Bangalore GPO",
        "area": "...",
        "district": "Bangalore",
        "state": "Karnataka",
        "branchType": "Head Post Office",
        "deliveryStatus": "Delivery",
        "circle": "...",
        "region": "...",
        "division": "..."
      }
    ]
  }
}
```

**Error examples**

| Status | When |
| --- | --- |
| 400 | Invalid pin / not Bangalore (`560…`) |
| 404 | No post offices found |
| 502 | India Post upstream failure |

### `GET /api/history`

Returns the latest 10 successful searches: `pincode`, `timestamp`, `totalResults`.

### `GET /health`

Lightweight health check for Render.

---

## Local installation

### Prerequisites

- Node.js 18+
- npm
- A MongoDB Atlas cluster (free tier is fine)

### 1. Clone and install

```bash
git clone <your-repo-url>
cd banglore

cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

### 2. Backend environment

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/bangalore-pincode-explorer?retryWrites=true&w=majority
CLIENT_URL=http://localhost:5173
POSTAL_API_BASE_URL=https://api.postalpincode.in/pincode
```

### 3. Frontend environment

```bash
cp frontend/.env.example frontend/.env
```

```env
VITE_API_URL=http://localhost:5000
```

### 4. Run

Terminal 1 — API:

```bash
cd backend
npm run dev
```

Terminal 2 — UI:

```bash
cd frontend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

**Try:** `560001`, `560034`, `560076`.

---

## Environment variables

### Backend

| Variable | Required | Description |
| --- | --- | --- |
| `PORT` | No | Defaults to `5000` (Render injects its own) |
| `NODE_ENV` | No | `development` or `production` |
| `MONGODB_URI` | Yes | MongoDB Atlas connection string |
| `CLIENT_URL` | Yes | Allowed CORS origin(s), comma-separated |
| `POSTAL_API_BASE_URL` | No | Defaults to India Post pincode endpoint |

### Frontend

| Variable | Required | Description |
| --- | --- | --- |
| `VITE_API_URL` | Yes | Backend base URL (no trailing slash) |

---

## Deployment guide

### Backend → Render

1. Push this repo to GitHub.
2. In Render, create a **Web Service** (or use Blueprint with root `render.yaml`).
3. Set **Root Directory** to `backend` (Blueprint already sets `rootDir: backend`).
4. Build: `npm install` · Start: `npm start`.
5. Add env vars:
   - `NODE_ENV=production`
   - `MONGODB_URI=<your Atlas URI>`
   - `CLIENT_URL=https://your-app.vercel.app`
   - (optional) `POSTAL_API_BASE_URL`
6. Confirm `https://<your-service>.onrender.com/health` returns OK.

> Free Render services spin down when idle; the first request after idle may take ~30–60s.

### Frontend → Vercel

1. Import the same GitHub repo in Vercel.
2. Set **Root Directory** to `frontend`.
3. Framework preset: Vite · Build: `npm run build` · Output: `dist`.
4. Add env: `VITE_API_URL=https://<your-service>.onrender.com`
5. Deploy, then update Render `CLIENT_URL` to the Vercel URL if you hadn’t already.

`frontend/vercel.json` rewrites all routes to `index.html` for SPA-safe refreshes.

### MongoDB Atlas checklist

- Create a cluster and database user.
- Network Access: allow Render IPs or `0.0.0.0/0` for demos (tighten for real production).
- Copy the `mongodb+srv://…` URI into `MONGODB_URI`.

---

## Screenshots

Add product screenshots here after your first local or deployed run:

| Light mode — search & results | Dark mode — recent searches |
| --- | --- |
| `docs/screenshots/light-results.png` | `docs/screenshots/dark-history.png` |

Suggested captures:

1. Empty dashboard with search box  
2. Successful results for `560001`  
3. Validation error for a non-Bangalore pin  
4. Dark mode view  

---

## Interview talking points

- **Why a service layer?** Keeps HTTP (controllers) separate from India Post + Mongo logic — easier to test and explain.
- **Why validate on both sides?** Instant UX on the client; security and correctness on the server.
- **Why not call India Post from the browser?** Centralize rate limits, CORS, logging, and history writes.
- **Why history only on success?** Spec-aligned; failed lookups don’t pollute recent searches.

---

## Future improvements

- Unit/integration tests (Jest/Vitest + Supertest)
- Redis caching for popular pincodes
- Auth + personal search history
- Map view of post office locations (when coordinates are available)
- OpenAPI/Swagger docs
- CI pipeline (lint, test, build on PR)
- Pagination if a pincode returns a large office list

---

## License

MIT
