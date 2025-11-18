import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { productRouter } from './route/product.js';
import { authRouter } from './route/auth.js';
import { userRouter } from './route/user.js';
import { roleRouter } from './route/role.js';
import { commentsRouter } from './route/comments.js';
import { categoryRouter } from './route/category.js';

dotenv.config();
const app = express();
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
// app.use(express.static(join(__dirname, '../client/dist')));
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/role', roleRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/comments', commentsRouter);
app.use('/api/v1/product', productRouter);
// app.get('регулярное выражение', (req, res) => {
//   res.sendFile(join('dist', 'index.html'));
// });

const start = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    app.listen(process.env.PORT, () =>
      console.log(`Сервер запущен на ${process.env.PORT} порту`)
    );
  } catch (error) {
    console.log(error.message);
  }
};

start();
