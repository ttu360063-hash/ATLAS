export async function sendMessage(message) {
  try {
    // Vercel envia requests para um backend remoto; garanta que VITE_API_URL exista.
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
      throw new Error('VITE_API_URL não definido');
    }

    const response = await fetch(`${apiUrl}/atlas/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: '1',
        message,
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

