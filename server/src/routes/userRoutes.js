// In your user routes (e.g., userRoutes.js)
import { Router } from 'express';
import { fetchAllUsers, getCurrentUser, getUserFromToken, searchUsers } from '../controllers/userControllers.js';
const userRoutes = Router();

userRoutes.get('/search', getUserFromToken, searchUsers);

userRoutes.get('/fetchAllUsers', getUserFromToken, fetchAllUsers )
userRoutes.get('/current-user', getUserFromToken, getCurrentUser);

  

export default userRoutes;
