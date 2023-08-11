import React, { useState, useEffect } from "react";
import io from "socket.io-client";

function useWebSocket() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const socket = io("http://localhost:3000");
    socket.on("connect", () => {
      console.log("Connected to server!");
    });
    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
    socket.on("error", (error) => {
      setError(error);
    });
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  const sendMessage = (message) => {
    if (socket.connected) {
      socket.send(message);
    }
  };
  return { messages, sendMessage, error };
}

function App() {
  return <></>;
}

export default App;
