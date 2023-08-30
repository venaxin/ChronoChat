import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
const socket = io.connect("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [msgReceived, setMsgReceived] = useState("");
  const [room, setRoom] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMsgReceived(data.message);
    });
  }, [socket]);

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };
  return (
    <div className="App">
      <input
        placeholder="Room no.."
        onChange={(event) => {
          setRoom("event.target.value");
        }}
      />
      <button onClick={joinRoom}>Join</button>
      <input
        placeholder="Type Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}>Send</button>
      <h1>message:</h1>
      {msgReceived}
    </div>
  );
}

export default App;
