// src/controllers/userController.js
import { userSchema } from '../models/schema.js';
import { db } from '../db.js';
import { and, not, ilike, eq  } from 'drizzle-orm';
import jwt from 'jsonwebtoken'; 

// Middleware to verify token and attach user information to the request
export const getUserFromToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(403).json({ message: 'Access denied. No token provided.' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;
      next();
    } catch (err) {
      console.error('Token verification failed:', err.message, 'Token:', token);
      return res.status(401).json({ message: 'Invalid token.' });
    }
  };
  


  export const searchUsers = async (req, res) => {
    const { query } = req.query;
    const { id: currentUserId } = req.user;
  
    try {
      const users = await db
        .select()
        .from(userSchema)
        .where(
          and(
            ilike(userSchema.name, `%${query}%`),
            not(eq(userSchema.id, currentUserId))
          )
        );
  
      res.json(users);
    } catch (error) {
      console.error('Error searching users:', error);
      res.status(400).json({ message: 'Error searching users.' });
    }
  };

  export const fetchAllUsers = async (req,res)=>{
    const {id:currentUserId} = req.user;
    try {
      const users = await db
      .select()
      .from(userSchema)
      .where(
        not(eq(userSchema.id, currentUserId))
      );
      res.json(users)
    } catch (error) {
      console.error('Error Fetching User: ', error )
      res.status(400).json({ message: 'Error Fetching Users'})
    }
  }
  
  export const getCurrentUser = async (req, res) => {
    try {
      const userId = req.user.id;
      const users = await db.select().from(userSchema).where(eq(userSchema.id, userId));
      const user = users[0];
  
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      // Exclude the password_hash from the response
      const { password_hash, ...userData } = user;
      res.json(userData);
    } catch (error) {
      console.error('Error fetching current user:', error);
      res.status(500).send('Server error');
    }
  };