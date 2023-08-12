import React, { useState, useEffect } from "react";
import io from "socket.io-client";
function useWebSocket() {
  // Define two pieces of state using the useState hook.
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  // Use the useEffect hook to set up the WebSocket connection when the component mounts.
  useEffect(() => {
    // Create a new socket connection to the server.
    const socket = io('http://localhost:3000');

    // Set up event listeners for different socket events.
    socket.on('connect', () => {
      console.log('Connected to server!');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    socket.on('error', (error) => {
      // Set the error state if an error occurs.
      setError(error);
    });

    socket.on('message', (message) => {
      // When a new message is received, update the 'messages' state to include the new message.
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Return a cleanup function that will be called when the component unmounts.
    return () => {
      // Disconnect the socket to prevent memory leaks.
      socket.disconnect();
    };
  }, []); // The empty array [] means the effect will run only once, similar to componentDidMount.

  // Define a function to send a message using the socket.
  const sendMessage = (message) => {
    if (socket.connected) {
      // Send the message using the 'send' method provided by the socket.
      socket.send(message);
    }
  };

  // Return an object containing the 'messages' state, 'sendMessage' function, and 'error' state.
  return { messages, sendMessage, error };
}
