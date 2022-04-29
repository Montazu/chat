import { Server } from "socket.io";

const io = new Server(8080, {
  cors: {
    origin: "https://chat.montazu.pl",
  },
});

io.on("connection", (socket) => {
  socket.on("message", (msg) => {
    io.emit("message", msg);
  });
});

console.log("Server is running on port 8080");
