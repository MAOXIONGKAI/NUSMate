let io;

const initSocket = (server) => {
  const socketIo = require("socket.io");

  io = socketIo(server, {
    cors: {
      origin: [
        "http://localhost:3000",
        "https://nusmate.onrender.com",
        "https://nusmate-development.onrender.com",
      ],
      methods: "GET,POST,PUT,DELETE",
      allowedHeaders: "Content-Type, Authorization",
    },
  });

  const logConnectedClients = () => {
    const clients = Array.from(io.sockets.sockets.keys());
    console.log("Connected clients:", clients);
  };

  io.on("connection", (socket) => {
    console.log(`New user connected via socket ${socket.id}`);
    logConnectedClients();
    socket.on("disconnect", () => {
      console.log(`Socket ${socket.id} disconnected`);
      logConnectedClients();
    });
  });

  return io;
};

const getIo = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

module.exports = { initSocket, getIo };
