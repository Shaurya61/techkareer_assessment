import { Router } from 'express';
import { db } from '../db.js';
import { messagesSchema } from '../models/schema.js';
import { eq, and } from 'drizzle-orm';

const chatRoutes = Router();

chatRoutes.get('/messages/:userId', async (req, res) => {
  const { userId } = req.params;
  const currentUserId = req.user.id; // Assuming JWT is decoded in middleware

  try {
    const messages = await db.select().from(messagesSchema).where(
      and(
        eq(messagesSchema.sender_id, currentUserId),
        eq(messagesSchema.receiver_id, userId)
      )
    ).or(
      and(
        eq(messagesSchema.sender_id, userId),
        eq(messagesSchema.receiver_id, currentUserId)
      )
    );

    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Error fetching messages.' });
  }
});

export default chatRoutes;
