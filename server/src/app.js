import { Server } from "socket.io";

const io = new Server(8080, {
  cors: {
    origin: "http://localhost:5500",
  },
});

io.on("connection", (socket) => {
  socket.on("message", (msg) => {
    io.emit("message", msg);
  });
});

console.log("Server is running on port 8080");
