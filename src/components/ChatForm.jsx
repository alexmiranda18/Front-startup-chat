import { useState } from 'react';
import axios from 'axios';

const ChatForm = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const [loading, setLoading] = useState(false);


  const cleanResponse = (text) => {
    return text
      .replace(/\*\*/g, '')
      .replace(/##/g, '')
      .replace(/\*/g, '')
      .replace(/\n/g, '\n') // Preserve line breaks
      .trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:3001/api/startup-idea', { question: input });
      const cleanedResponse = cleanResponse(res.data.answer);
      setResponse(cleanedResponse);
    } catch (error) {
      console.error('Erro ao enviar a solicitação:', error);
      setResponse('Erro ao buscar resposta.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col min-h-screen items-center justify-center py-8 px-4">
      <div className="bg-white p-8 rounded-lg w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">Startup Assistant</h1>
        <div className="flex flex-col space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="question">
                Compartilhe sua idéia com o ChatGPT sobre Startups e receba um caminho por ende começar!
              </label>
              <input
                id="question"
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 transition duration-300 text-gray-900"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua idéia!"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400 transition duration-300"
            >
              Enviar
            </button>
          </form>
  
          {loading && (
            <div className="flex justify-center items-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            </div>
          )}
  
          {response && (
            <div className="flex flex-col mt-4 bg-white p-4 rounded-lg w-full max-w-2xl">
              <h2 className="text-2xl text-gray-700 font-semibold mb-4">Resposta:</h2>
              <pre className="text-gray-700 whitespace-pre-wrap overflow-y-auto max-h-96">{response}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default ChatForm;
