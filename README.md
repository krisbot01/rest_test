# Express REST Demo (Beginner Guide)

This project is a tiny Express server with a simple in‑memory to‑do API. It also serves a small web page that talks to the API.

## What This Project Is
- **Server:** `server.js` is the main file. It creates the Express app, defines API routes, and starts the server.
- **Frontend:** Everything inside `public/` is static web content. `index.html` is the page you see in the browser.

## How It Works (Focus on `server.js`)
`server.js` does four main things:
1. **Create the server** with Express.
2. **Serve JSON** so the API can read and send data.
3. **Serve static files** from the `public/` folder (so `index.html` loads in the browser).
4. **Define API routes** for create, read, update, and delete.

### In‑Memory Data
The server stores items in an array in memory:
- When the server restarts, the list resets.
- There is no database in this demo.

### API Endpoints
- `GET /api/items` – Get all items.
- `GET /api/items/:id` – Get one item by id.
- `POST /api/items` – Create an item. Body: `{ "name": "..." }`.
- `PUT /api/items/:id` – Update an item. Body can include `{ "name": "...", "done": true }`.
- `DELETE /api/items/:id` – Remove an item.

## What’s in `public/`
- `public/` is a folder for files the browser can load directly.
- `public/index.html` is the main page that shows a list of items, sends `fetch` requests to the API, and updates the page when items change.

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```
3. Open your browser:
   ```
   http://localhost:3000
   ```

## Quick Test (Optional)
You can try the API directly in the browser or with curl:
```bash
curl http://localhost:3000/api/items
```

## Notes for Beginners
- The server runs on port `3000` by default.
- You can change the port with the `PORT` environment variable.
- This is a learning project, so everything is kept simple and in one file.
