const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { adjustTone } = require('./mistralClient');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.post('/api/adjust-tone', async (req, res) => {
  const { text, toneLevel } = req.body;
  try {
    const result = await adjustTone(text, toneLevel);
    res.json({ text: result });
  } catch (error) {
    res.status(500).json({ error: 'Tone adjustment failed' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));