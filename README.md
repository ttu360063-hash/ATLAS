# ATLAS Desktop

Aplicativo desktop instalável do sistema ATLAS usando Electron.

## Desenvolvimento

1. Instalar dependências:
   ```
   npm install
   ```

2. Modo desenvolvimento (abre Vite dev server + Electron):
   ```
   npm run dev
   ```

3. Build para produção:
   ```
   npm run build
   ```

4. Build Electron:
   ```
   npm run build:electron
   ```

5. Gerar .exe instalável:
   ```
   npm run dist
   ```
   - Arquivos em `dist/`

## Recursos
- Janela centralizada 1200x800, título ATLAS
- Chat com tema dark
- Mock AI (respostas simuladas)
- Sem dependência de navegador
- DevTools no modo dev

## Próximos Passos
- Integrar backend AI real
- Adicionar ícone
- Auto-updates
