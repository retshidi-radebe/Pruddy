import { Server } from "socket.io";
import { createServer } from "http";

const PORT = 3003;

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`[WebSocket] Client connected: ${socket.id}`);

  socket.on("join", (username: string) => {
    socket.data.username = username;
    console.log(`[WebSocket] ${username} joined`);
    io.emit("message", {
      type: "system",
      content: `${username} has joined the chat`,
      timestamp: new Date().toISOString(),
    });
  });

  socket.on("message", (content: string) => {
    const username = socket.data.username || "Anonymous";
    console.log(`[WebSocket] ${username}: ${content}`);
    io.emit("message", {
      type: "user",
      username,
      content,
      timestamp: new Date().toISOString(),
    });
  });

  socket.on("disconnect", () => {
    const username = socket.data.username;
    if (username) {
      console.log(`[WebSocket] ${username} left`);
      io.emit("message", {
        type: "system",
        content: `${username} has left the chat`,
        timestamp: new Date().toISOString(),
      });
    }
  });
});

httpServer.listen(PORT, () => {
  console.log(`[WebSocket] Server running on port ${PORT}`);
});

// Graceful shutdown
const shutdown = () => {
  console.log("[WebSocket] Shutting down...");
  io.close(() => {
    httpServer.close(() => {
      console.log("[WebSocket] Server closed");
      process.exit(0);
    });
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
