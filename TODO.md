# TODO: Integração Frontend-Backend ATLAS (e IA local via Ollama/LiteLLM)

- [x] 1. Criar/validar fluxo básico Frontend -> Backend -> Resposta
- [ ] 2. Integrar IA local via Ollama usando proxy LiteLLM (OpenAI-compatible)
  - [ ] 2.1 Editar `atlas-backend/src/services/ai.js` para chamar `POST {baseUrl}/v1/chat/completions` com Authorization Bearer
  - [ ] 2.2 Ajustar `atlas-backend/src/index.js` (opcional) para permitir env de baseUrl/porta
  - [ ] 2.3 Atualizar/introduzir `.env` (ou `.env.example`) com `OLLAMA_BASE_URL` e `OLLAMA_API_KEY`
- [ ] 3. Testar endpoint `POST http://localhost:3000/atlas/chat`
- [ ] 4. Rodar frontend e validar mensagens no chat

