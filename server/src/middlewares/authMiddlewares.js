import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

/**
 * Middleware to verify JWT token and attach user information to the request.
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 * @param {Function} next - Callback to pass control to the next middleware.
 */
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header
  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Attach user info to requestnext();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

export default verifyToken;

