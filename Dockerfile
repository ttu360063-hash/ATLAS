FROM node:20-slim

# Dependencies do sistema: curl + Python (LiteLLM proxy)
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    ca-certificates \
    python3 \
    python3-pip \
    python3-venv \
  && curl -fsSL https://ollama.com/install.sh | sh \
  && rm -rf /var/lib/apt/lists/*

# venv Python e LiteLLM
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
RUN pip install --no-cache-dir 'litellm[proxy]'

WORKDIR /app

# Instala dependências apenas do backend primeiro (melhora cache)
COPY atlas-backend/package*.json ./atlas-backend/
RUN cd atlas-backend && npm install

# Copia o resto do projeto
COPY . .

# Script de inicialização que orquestra Ollama + LiteLLM + Backend
COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 3000

CMD ["/bin/bash", "/start.sh"]

