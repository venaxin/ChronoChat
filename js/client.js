const socket = io();
let name;
do {
  name = prompt("Please enter your name: ");
} while (!name);
//this while loop basically makes sure that name has to be entered else prompt wont close

let textarea = document.querySelector("#textarea");

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

function sendMessage(message) {
  let msg = {
    user: name,
    message: message.trim(),
  };
  //append | display message first then it shoudl go to server
  appendMessage(msg, "outgoing");
  textarea.value = "";
  scrollToBottom();

  //send to server via socket
  socket.emit("message", msg);
}

//receive message
socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  scrollToBottom();
});

let messageArea = document.querySelector(".message__area");

function appendMessage(msg, type) {
  //create the message box
  let mainDiv = document.createElement("div");
  let className = type;

  //to add classes|classnames to mainDiv
  mainDiv.classList.add(className, "message");
  let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}<p>
    `;
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
