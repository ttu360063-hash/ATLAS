const cacheService = require('../services/cache');
const memoryService = require('../services/memory');
const aiService = require('../services/ai');

async function processMessage(userId, message) {
  const cacheKey = `cache:${userId}:${message}`;
  
  // Verificar cache
  const cachedResponse = cacheService.get(cacheKey);
  if (cachedResponse) {
    return cachedResponse;
  }

  // Verificar memória
  const history = memoryService.getHistory(userId);
  const context = history.length > 0 
    ? `Contexto anterior: ${JSON.stringify(history.slice(-3))}. ` 
    : '';

  // Chamar IA
  const fullPrompt = context + message;
  const response = aiService.generateResponse(fullPrompt);

  // Salvar na memória
  memoryService.saveMessage(userId, message, response);

  // Salvar no cache
  cacheService.set(cacheKey, response);

  return response;
}

module.exports = {
  processMessage
};
