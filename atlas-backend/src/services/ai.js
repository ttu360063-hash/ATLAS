const DEFAULT_MODEL = 'qwen2.5-coder:7b';

function getEnv(name, fallback) {
  const v = process.env[name];
  return (v === undefined || v === '') ? fallback : v;
}

async function generateResponse(fullPrompt, { userId } = {}) {
  const baseUrl = getEnv('OLLAMA_BASE_URL', 'http://localhost:4000/v1/chat/completions');
  const apiKey = getEnv('OLLAMA_API_KEY', getEnv('OPENAI_API_KEY', ''));
  const model = getEnv('OLLAMA_MODEL', DEFAULT_MODEL);


  // baseUrl esperado já inclui /v1/chat/completions per especificação
  const url = baseUrl;

  const messages = [
    {
      role: 'user',
      content: fullPrompt,
    },
  ];

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
    },
    body: JSON.stringify({
      model,
      messages,
      // Parâmetros opcionais para respostas mais previsíveis
      temperature: 0.2,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Erro ao chamar IA local via LiteLLM. HTTP ${res.status}: ${text}`);
  }

  const data = await res.json();

  // OpenAI-compatible: choices[0].message.content
  const content = data?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('Resposta inválida da IA local (content ausente)');
  }

  return content;
}

module.exports = {
  generateResponse,
};

