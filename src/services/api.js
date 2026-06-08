export async function sendMessage(message) {
  try {
    const response = await fetch('http://localhost:3000/atlas/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: "1",
        message: message
      }),
    });

    if (!response.ok) {
      throw new Error('Erro na requisição');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    throw new Error('Falha na conexão com o backend');
  }
}
