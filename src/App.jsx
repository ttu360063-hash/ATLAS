import React, { useState, useRef, useEffect } from 'react'
import ChatWindow from './components/ChatWindow'
import { sendMessage } from './services/api'

function App() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Olá! Bem-vindo ao ATLAS. Como posso ajudar?', sender: 'ai', time: new Date() }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMsg = { id: Date.now(), text: input.trim(), sender: 'user', time: new Date() }
    setMessages(prev => [...prev, userMsg])
    setInput('')

    try {
      const responseText = await sendMessage(userMsg.text);
      const aiResponse = {
        id: Date.now() + 1,
        text: responseText,
        sender: 'ai',
        time: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
    } catch (error) {
      // Só mostra erro se realmente houve falha real (rede/JSON/status não-2xx)
      const errorMsg = {
        id: Date.now() + 1,
        text: 'Erro ao conectar com ATLAS',
        sender: 'ai',
        time: new Date()
      }
      setMessages(prev => [...prev, errorMsg])
    }

  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col dark">
      <header className="p-4 border-b border-gray-700">
        <h1 className="text-2xl font-bold">ATLAS</h1>
      </header>
      <main className="flex-1 overflow-hidden">
        <ChatWindow messages={messages} messagesEndRef={messagesEndRef} />
      </main>
      <footer className="p-4 border-t border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Digite sua mensagem..."
          />
          <button
            onClick={handleSend}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
          >
            Enviar
          </button>
        </div>
      </footer>
    </div>
  )
}

export default App
