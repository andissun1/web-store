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
import { loadInitialDBData } from './loadData/loadData.js';
import { filtersRouter } from './route/filters.js';
import { orderRouter } from './route/order.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const app = express();
app.use(
  cors({
    origin: 'http://localhost:80',
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.static(join(__dirname, 'dist')));

app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/role', roleRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/comments', commentsRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/filters', filtersRouter);

const start = async () => {
  try {
    console.log(process.env.CONNECTION_STRING);

    await mongoose.connect(process.env.CONNECTION_STRING);
    app.listen(process.env.PORT, () =>
      console.log(`Сервер запущен на ${process.env.PORT} порту`)
    );
    loadInitialDBData();
  } catch (error) {
    console.log(error.message);
  }
};

start();
