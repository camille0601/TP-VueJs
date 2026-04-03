const express = require('express')
const cors = require('cors')
const fs = require('fs').promises
const path = require('path')
const bcrypt = require('bcryptjs')

const DB_PATH = path.join(__dirname, 'db.json')

async function readDB() {
  const raw = await fs.readFile(DB_PATH, 'utf8')
  return JSON.parse(raw)
}

async function writeDB(data) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf8')
}

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/reviews', async (req, res) => {
  const db = await readDB()
  res.json(db.reviews || [])
})

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.post('/api/reviews', async (req, res) => {
  try {
    const db = await readDB()
    const { title, message, rating, username } = req.body
    if (!title || !message) return res.status(400).json({ ok: false, message: 'title and message are required' })
    const review = {
      id: Date.now(),
      title,
      message,
      rating: Number(rating) || 0,
      username: username || 'anonymous',
      date: new Date().toISOString(),
    }
    db.reviews = db.reviews || []
    db.reviews.push(review)
    await writeDB(db)
    res.json({ ok: true, review })
  } catch (err) {
    console.error(err)
    res.status(500).json({ ok: false, message: 'server error' })
  }
})

app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) return res.status(400).json({ ok: false, message: 'username and password required' })
    const db = await readDB()
    db.users = db.users || {}
    if (db.users[username]) return res.status(409).json({ ok: false, message: 'user exists' })
    const hash = bcrypt.hashSync(password, 8)
    db.users[username] = { username, passwordHash: hash }
    await writeDB(db)
    res.json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ ok: false, message: 'server error' })
  }
})

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) return res.status(400).json({ ok: false, message: 'username and password required' })
    const db = await readDB()
    const u = (db.users || {})[username]
    if (!u) return res.status(401).json({ ok: false, message: 'invalid credentials' })
    const match = bcrypt.compareSync(password, u.passwordHash)
    if (!match) return res.status(401).json({ ok: false, message: 'invalid credentials' })
    // simple response — no JWT for now
    res.json({ ok: true, user: { username } })
  } catch (err) {
    console.error(err)
    res.status(500).json({ ok: false, message: 'server error' })
  }
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`))
