# ChefTrack Pro

A React and Express recipe-learning app with a MongoDB-backed account and progress flow. The interface includes recipe browsing and details, profile and contact pages, Tamil/English language switching, and level progress.

## Run locally

Requirements: Node.js and MongoDB.

### Backend

```sh
cd backend
npm install
```

Copy `backend/.env.example` to `backend/.env`, set `MONGO_URI` and a private `JWT_SECRET`, then run:

```sh
npm start
```

The API starts on port `5000` by default.

### Frontend

In a second terminal:

```sh
cd frontend
npm install
npm run dev
```

Copy `frontend/.env.example` to `frontend/.env` if the backend is hosted somewhere other than `http://localhost:5000/api`. Build with `npm run build`.

## API routes

- `POST /api/auth/register` and `POST /api/auth/login`
- `GET /api/recipes` — list recipes
- `POST /api/recipes/complete` — update recipe progress
- `GET /api/recipes/:id/reviews` and `POST /api/recipes/:id/reviews`

## Data notes

User accounts and progress use MongoDB. Recipe reviews are currently held in memory and reset when the backend restarts. Keep local `.env` files private; the repository ignores them.
