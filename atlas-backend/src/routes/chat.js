const express = require('express');
const { processMessage } = require('../core/orchestrator');

const router = express.Router();

router.post('/chat', async (req, res) => {
  const { userId, message } = req.body;

  if (!userId || !message) {
    return res.status(400).json({ error: 'userId e message são obrigatórios' });
  }

  try {
    const response = await processMessage(userId, message);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
