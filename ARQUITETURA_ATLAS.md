# Arquitetura Lógica do Sistema ATLAS

## 1. Visão Geral
O sistema ATLAS é composto por três camadas principais interconectadas: **Frontend** (interface de usuário), **Backend** (lógica de negócio e processamento), e **Desktop** (aplicativo Electron para execução nativa). O fluxo central é o chat: usuário envia mensagem → backend processa → resposta exibida no frontend.

## 2. Camadas e Responsabilidades

### Frontend (Interface do Chat)
- Responsabilidades:
  - Exibir lista de mensagens (usuário e AI).
  - Capturar input do usuário (texto).
  - Gerenciar estado local (mensagens recentes, scroll).
  - Aplicar tema dark.
- Não processa lógica de IA; apenas renderiza e envia dados.

### Backend (Processamento de IA)
- Responsabilidades:
  - Receber mensagens do frontend.
  - Processar com modelo de IA (gerar respostas inteligentes).
  - Gerenciar histórico de conversa.
  - Validar e sanitizar inputs.
- Executa localmente ou via API externa para performance.

### Desktop (Electron - Camada de Contêiner)
- Responsabilidades:
  - Processo principal: Gerencia janela (centralizada, título \"ATLAS\").
  - Carrega frontend em renderer process.
  - Preload: APIs seguras entre main/renderer.
  - Integra backend via comunicação IPC ou subprocesso.
  - Garante execução offline, instalável como app nativo.

## 3. Fluxo de Dados
1. Usuário digita mensagem no frontend → Envia para backend via IPC/API.
2. Backend processa (IA gera resposta) → Retorna resposta formatada.
3. Frontend recebe e adiciona à lista de mensagens.
4. Desktop gerencia eventos nativos (fechar, redimensionar) sem interferir no chat.

```
Usuário → Frontend (Input/UI) → IPC/API → Backend (IA/Lógica) → Resposta → Frontend (Display) → Usuário
                          ↑
                    Desktop (Janela/Segurança)
```

## 4. Comunicação entre Módulos
- **Frontend ↔ Backend**: IPC (Electron channels) para execução local ou HTTP/WebSocket para distribuído.
- **Frontend ↔ Desktop**: ContextBridge via preload para acesso seguro a features nativas (ex: storage).
- **Desktop ↔ Backend**: Subprocesso ou módulo carregado no main process.
- Isolamento: Renderer não acessa Node.js diretamente; tudo via canais definidos.

Esta arquitetura garante app standalone, chat direto, tema dark e foco em segurança/performance.
