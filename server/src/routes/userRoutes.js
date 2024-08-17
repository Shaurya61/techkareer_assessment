// In your user routes (e.g., userRoutes.js)
import { Router } from 'express';
import { db } from '../db.js';
import { userSchema } from '../models/schema.js';
import { ne } from 'drizzle-orm';
import verifyToken from '../middlewares/authMiddlewares.js';

const userRoutes = Router();

userRoutes.get('/api/users', async (req, res) => {
    const currentUserId = req.user.id;
  
    try {
      const users = await db.select().from(userSchema).where(ne(userSchema.id, currentUserId));
      res.json(users); // Ensure this sends JSON response
      console.log('users:', users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Error fetching users.' });
    }
  });

userRoutes.get('/current-user', verifyToken, async (req, res) => {
    try {
      const user = await db.select().from(userSchema).where(eq(userSchema.id, req.user.id));
      res.json(user[0]);
    } catch (error) {
      console.error('Error fetching current user:', error);
      res.status(500).json({ message: 'Error fetching current user.' });
    }
  });
  

export default userRoutes;
