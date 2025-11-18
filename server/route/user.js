import { Router } from 'express';
import { User } from '../model/user.js';
import { hasRole } from '../middleweare/hasRole.js';

export const userRouter = Router();

// get all
userRouter.get('/', hasRole(['admin']), async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get one
userRouter.get('/:id', hasRole(['admin']), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// add user in auth route

// update
userRouter.patch('/:id', hasRole(['admin']), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete
userRouter.delete('/:id', hasRole(['admin']), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Пользователь удалён' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
