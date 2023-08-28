const { Socket } = require("dgram");
const express = require("express");
const app = express();

const http = require("http").createServer(app);

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.use(express.static(__dirname + "/public"));

//creating a route
app.get("/", (req, res) => {
  //sends our index.html file to browser at port 3000
  res.sendFile(__dirname + "/index.html");
});

//socket runs on http server
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("Connected...");

  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});
