import { Router } from 'express';
import { User } from '../model/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Role } from '../model/role.js';

export const authRouter = Router();

// add user
authRouter.post('/register', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Почта уже занята' });

    const hashedPassword = await bcrypt.hash(password, 10);
    if (!role) {
      const roleID = await Role.findOne({ name: 'user' });
      req.body.role = roleID.id;
    }

    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    const token = await jwt.sign({ userID: user.id }, process.env.JWT_SECRET);
    res.cookie('token', token, { httpOnly: true });

    const { password: _, ...userData } = user.toObject();
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// login
authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: 'Почта не найдена' });
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Авторизация не пройдена' });
    }
    const token = await jwt.sign({ userID: existingUser._id }, process.env.JWT_SECRET);
    res.cookie('token', token, { httpOnly: true });
    const { password: _, ...userData } = existingUser.toObject();
    res.status(200).json({ userData });
  } catch (error) {}
});

// logout
authRouter.post('/logout', async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Завершение сеанса' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Me
authRouter.get('/me', async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Не авторизован' });
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.userID);
    const { password: _, ...userData } = user.toObject();
    res.status(200).json({ user: userData, message: 'Вы авторизованы' });
  } catch (error) {}
});
