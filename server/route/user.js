import { Router } from 'express';
import { User } from '../model/user.js';
import { hasRole } from '../middleweare/hasRole.js';

export const userRouter = Router();

// get all users
userRouter.get('/', hasRole(['admin']), async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
