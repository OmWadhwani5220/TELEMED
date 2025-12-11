require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { body, validationResult } = require('express-validator');

const Contact = require('./models/Contact');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ ok: true, dbState: mongoose.connection.readyState });
});

app.post(
  '/api/contact',
  [
    body('name').notEmpty().withMessage('Name required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('message').notEmpty().withMessage('Message required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { name, email, phone, subject, message, agree } = req.body;
      const c = new Contact({ name, email, phone, subject, message, agree: !!agree });
      const saved = await c.save();
      return res.status(201).json({ message: 'Contact saved', id: saved._id });
    } catch (err) {
      console.error('Save error:', err);
      return res.status(500).json({ error: 'Server error' });
    }
  }
);

// Connect to MongoDB and start server AFTER successful connection
(async function start() {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error('MONGO_URI not set in .env');

    // NOTE: no deprecated options here
    await mongoose.connect(uri);

    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('DB Error:', err);
    process.exit(1);
  }
})();
