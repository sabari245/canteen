import express from 'express';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const router = express.Router();

router.post('/chat', (req, res) => {
  const message = req.body.message;
  console.log(message);
  res.json([]);
});

export default router;