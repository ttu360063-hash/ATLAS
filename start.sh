#!/bin/bash
set -e

# ---- Ollama ----
export OLLAMA_NUM_PARALLEL="${OLLAMA_NUM_PARALLEL:-1}"
export OLLAMA_MAX_LOADED_MODELS="${OLLAMA_MAX_LOADED_MODELS:-1}"

# Garanta que o diretório do Ollama existe
mkdir -p /root/.ollama

# Inicia Ollama em background
ollama serve &
OLLAMA_PID=$!

# Aguarda Ollama ficar pronto
echo "Aguardando Ollama subir..."
for i in {1..30}; do
  if curl -fsS http://localhost:11434/api/tags >/dev/null 2>&1; then
    break
  fi
  sleep 1
done

# Baixa modelo (ajuste via env)
if [ -n "${OLLAMA_MODEL_NAME:-}" ]; then
  echo "Baixando modelo: ${OLLAMA_MODEL_NAME}"
  ollama pull "${OLLAMA_MODEL_NAME}" || true
fi

# ---- LiteLLM Proxy (OpenAI-compatible) ----
export LITELLM_MASTER_KEY="${LITELLM_MASTER_KEY:-${OLLAMA_API_KEY}}"

MODEL="${OLLAMA_MODEL_NAME:-${OLLAMA_MODEL:-qwen2.5-coder:7b}}"

litellm --model "ollama/${MODEL}" --port 4000 &
LITELLM_PID=$!

echo "Aguardando LiteLLM subir..."
for i in {1..30}; do
  if curl -fsS http://localhost:4000/v1/models >/dev/null 2>&1; then
    break
  fi
  sleep 1
done

# ---- Backend Node ----
# Variáveis para o atlas-backend (ai.js usa OLLAMA_BASE_URL/OLLAMA_API_KEY)
export OLLAMA_BASE_URL="${OLLAMA_BASE_URL:-http://localhost:4000/v1/chat/completions}"
export OLLAMA_API_KEY="${OLLAMA_API_KEY:-${LITELLM_MASTER_KEY}}"
export OLLAMA_MODEL="${OLLAMA_MODEL_NAME:-${OLLAMA_MODEL:-qwen2.5-coder:7b}}"

cd /app/atlas-backend

# Render usa PORT/host via env; fallback local é 3000
export PORT="${PORT:-3000}"

# Start server
npm start

# (não alcançado)
wait $LITELLM_PID
wait $OLLAMA_PID

