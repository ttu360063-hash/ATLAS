const memory = new Map();

function getHistory(userId) {
  if (!memory.has(userId)) {
    memory.set(userId, []);
  }
  return memory.get(userId);
}

function saveMessage(userId, message, response) {
  const history = getHistory(userId);
  history.push({ message, response, timestamp: Date.now() });
  memory.set(userId, history);
}

module.exports = {
  getHistory,
  saveMessage
};
