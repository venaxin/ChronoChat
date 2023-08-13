//require the HTTP and socket.io modules
const http = require("http");
const io = require("socket.io");

//create an HTTP server
const server = http.createServer((req, res) => {
  res.end("Server is running!");
});
const port = 3000;
//bind server to a port
server.listen(port, () => {
  console.log(`server is connected on ${port}`);
});

//create a socket.io server by passing the HTTP server instance
const ioServer = io(server);

// Now you can use 'ioServer' to handle socket connections and events
ioServer.on("connection", (socket) => {
  console.log("A user connected");

  // Handle socket events here

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

ioServer.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("message", (message) => {
    console.log(`Received message from client: ${message}`);
    ioServer.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
