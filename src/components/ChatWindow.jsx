function ChatWindow({ messages, messagesEndRef }) {
  return (
    <div className="flex-1 p-4 overflow-y-auto bg-gray-900">
      <div className="space-y-4 mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user'
                ? 'justify-end'
                : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-blue-600'
                  : 'bg-gray-800'
              }`}
            >
              <p>{message.text}</p>

              <span className="text-xs opacity-75 block mt-1">
                {new Date(message.time).toLocaleTimeString('pt-BR')}
              </span>
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}

export default ChatWindow