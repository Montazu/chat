const messageBox = document.querySelector(".chat__form__textarea");
const chat = document.querySelector(".chat__box");
const fragment = document.createDocumentFragment();

const socket = io.connect("http://77.55.214.134");
socket.on("connect", () => {
  console.log(`Connection: ${socket.connected}`);
});
socket.on("disconnect", () => {
  console.log(`Connection: ${socket.connected}`);
});

const scrollToBottom = () => chat.scrollTo(0, chat.scrollHeight);

scrollToBottom();

messageBox.addEventListener("input", () => {
  messageBox.rows = 1;
  messageBox.rows = (messageBox.scrollHeight - 44) / 17 + 1;
  scrollToBottom();
});

const sendMessage = () => {
  if (!messageBox.value) return;
  socket.emit("message", messageBox.value);
  messageBox.value = "";
  scrollToBottom();
};

socket.on("message", async (msg) => {
  const div = document.createElement("div");
  const span = document.createElement("span");
  div.classList.add("chat__box__message");
  span.classList.add("chat__box__message__author");
  span.textContent = "User";
  div.textContent = msg;
  div.appendChild(span);
  chat.appendChild(div);
  scrollToBottom();
});
