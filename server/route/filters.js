import { Router } from 'express';
import { Product } from '../model/product.js';

export const filtersRouter = Router();

// Поиск
filtersRouter.get('/search', async (req, res) => {
  try {
    const { page, limit, name } = req.query;

    const [products, count] = await Promise.all([
      Product.find({ $text: { $search: name } })
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 }),
      Product.countDocuments({ $text: { $search: name } }),
    ]);

    res.status(200).json({ products, lastPage: Math.ceil(count / limit) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
