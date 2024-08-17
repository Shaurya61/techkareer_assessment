import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userSchema } from '../models/schema.js';
import { db } from '../db.js';
import { eq } from 'drizzle-orm';
import { config } from 'dotenv';
config();

/**
 * Handles user signup by hashing the password and storing user data in the database.
 * @param {Object} req - Request object containing user data.
 * @param {Object} res - Response object used to send responses.
 */
export const signup = async (req, res) => {
  const {name, email, password } = req.body;
  try {
    const password_hash = await bcrypt.hash(password, 10);
    console.log('password_hash:', password_hash);

    await db.insert(userSchema).values({
      name,
      email,
      password_hash,
      created_at: new Date(),
      updated_at: new Date()
    });

    res.status(201).send('User registered successfully!');
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(400).send('Error registering user.');
  }
};

/**
 * Handles user login by verifying credentials and issuing a JWT token.
 * @param {Object} req - Request object containing user data.
 * @param {Object} res - Response object used to send responses.
 */
export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log('Received Email:', email); // Should be the actual email
  console.log('Received Password:', password); // Should be the actual password
  try {
    const users = await db.select().from(userSchema).where(eq(userSchema.email, email));
    const user = users[0]; // Assuming emails are unique

    if (!user) {
      console.log('User not found');
      return res.status(401).send('Invalid credentials.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    console.log('Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).send('Invalid credentials.');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Token:', token);
    res.cookie('token', token, { httpOnly: true }).send(token);
  } catch (error) {
    console.error('Error during login:', error);
    res.status(400).send('Error logging in.');
  }
};
