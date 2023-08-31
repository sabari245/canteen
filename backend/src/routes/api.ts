import express from 'express';

const router = express.Router();

router.post('/order', (req, res) => {
  const message = req.body.message;
  console.log(message);
  res.json({});
});

export default router;