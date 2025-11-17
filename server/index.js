import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { productRouter } from './route/product.js';
import { authRouter } from './route/user.js';

dotenv.config();
const app = express();
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/product', productRouter);
app.use('/api/v1/auth', authRouter);

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
