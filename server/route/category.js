import { Router } from 'express';
import { Category } from '../model/category.js';
import { Product } from '../model/product.js';

export const categoryRouter = Router();

// get all
categoryRouter.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ position: 1 });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get one
categoryRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const key = Object.keys(req.query)[0]; // Определяю ключ для сортировки
    const direction = req.query[key] === 'asc' ? 1 : -1;
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;

    const products = await Product.find(
      id === 'all'
        ? undefined
        : {
            category: id,
          }
    )
      .sort({ [key]: direction })
      .limit(limit)
      .skip((page - 1) * limit);

    const count = await Product.countDocuments(
      id === 'all'
        ? undefined
        : {
            category: id,
          }
    );

    res.status(200).json({ products, lastPage: Math.ceil(count / limit), count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// create
categoryRouter.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update
categoryRouter.patch('/:id', async (req, res) => {
  try {
    const newCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete
categoryRouter.delete('/:id', async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Категория была удалена' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
