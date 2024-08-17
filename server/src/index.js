import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import { config } from 'dotenv';
import chatRoutes from './routes/chatRoutes.js';
import verifyToken from './middlewares/authMiddlewares.js';
import userRoutes from './routes/userRoutes.js';

config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use('/auth', authRoutes);


// Socket.io connection
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle incoming messages
  socket.on('send_message', async (data) => {
    await db.insert(messagesSchema).values({
      sender_id: data.sender_id,
      receiver_id: data.receiver_id,
      content: data.content,
      timestamp: new Date(),
    });

    io.to(data.receiver_id.toString()).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});
app.use('/api', verifyToken, chatRoutes);
app.use('/api/users', verifyToken, userRoutes);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
