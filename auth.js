// auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
const users = []; // in-memory demo, replace with DB in prod

// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });
  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, password: hashed });
  res.json({ message: 'Registered' });
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const u = users.find(x => x.username === username);
  if (!u) return res.status(400).json({ error: 'no such user' });
  const ok = await bcrypt.compare(password, u.password);
  if (!ok) return res.status(401).json({ error: 'invalid credentials' });
  const token = jwt.sign({ username }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
