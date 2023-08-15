import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

function useWebSocket() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to server!');
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    newSocket.on('error', (error) => {
      setError(error);
    });

    newSocket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = (message) => {
    if (socket && socket.connected) {
      socket.send(message);
    }
  };

  return { messages, sendMessage, error };
}

function App() {
  const { messages, sendMessage, error } = useWebSocket();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const messageInput = event.target.elements.message;
          sendMessage(messageInput.value);
          messageInput.value = '';
        }}
      >
        <input name="message" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;