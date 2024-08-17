import express from 'express';
import { Server } from "socket.io";
import http from "http";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { config } from 'dotenv';
config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use('/auth', authRoutes);
app.use('/api', userRoutes);

io.on("connection", (socket) => {
  const { userId } = socket.handshake.query;

  console.log(`User connected: ${userId}`);

  // Handle joining a room when a user selects another user
  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`User ${userId} joined room: ${room}`);
  });

  // Handle sending a message to the room
  socket.on("sendMessage", (message) => {
    const room = [message.senderId, message.receiverId].sort().join("-");
    io.to(room).emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${userId}`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
