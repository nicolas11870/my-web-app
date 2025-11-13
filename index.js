// index.js (excerpt)
const express = require('express');
const app = express();
app.use(express.json());

const authRoutes = require('./auth');
app.use('/auth', authRoutes);

// existing routes...

