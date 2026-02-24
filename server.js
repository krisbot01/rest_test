const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

let nextId = 4;
const items = [
  { id: 1, name: 'Learn Express', done: false },
  { id: 2, name: 'Build a REST API', done: false },
  { id: 3, name: 'Test with fetch', done: true }
];

function findItem(id) {
  return items.find((item) => item.id === id);
}

// Get all items
// GET /api/items
app.get('/api/items', (req, res) => {
  res.json(items);
});

// Get a single item by id
// GET /api/items/$ID
app.get('/api/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = findItem(id);
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json(item);
});

// Post (create) a new item
// POST /api/items
app.post('/api/items', (req, res) => {
  const { name, done } = req.body;
  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'Name is required' });
  }

  const item = {
    id: nextId++,
    name: name.trim(),
    done: Boolean(done)
  };
  items.push(item);
  res.status(201).json(item);
});

// Update an existing item
// PUT /api/items/$ID
app.put('/api/items/:id', (req, res) => {

  // Convert the id to a number, try to find it
  const id = Number(req.params.id);
  const item = findItem(id);

  // If it's not found return error 404 (cannot be found)
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }

  const { name, done } = req.body;

  // Make sure that the request has a name and it's not an empty string ("")
  if (name !== undefined) {
    if (typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ error: 'Name must be a non-empty string' });
    }
    item.name = name.trim();
  }

  // Set done if done it included in the request
  if (done !== undefined) {
    item.done = Boolean(done);
  }

  res.json(item);
});

// Delete item with id
// DELETE /api/items/$ID
app.delete('/api/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  const [removed] = items.splice(index, 1);
  res.json(removed);
});

// Make sure the server listens to the port
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
