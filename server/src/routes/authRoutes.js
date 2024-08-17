// src/routes/authRoutes.js
import express from 'express';
import { signup, login } from '../controllers/authControllers.js';
import verifyToken from '../middlewares/authMiddlewares.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/protected', verifyToken, (req, res) => {
  res.send('This is a protected route.');
});

router.get('/chat', verifyToken, (req, res) => {
  res.send('Welcome to the chat!');
});

export default router;
