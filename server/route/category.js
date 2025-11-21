import { Router } from 'express';
import { Category } from '../model/category.js';
import { Product } from '../model/product.js';
import mongoose from 'mongoose';

export const categoryRouter = Router();

// get all
categoryRouter.get('/', async (req, res) => {
  try {
    const caregories = await Category.find();
    res.status(200).json(caregories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get one
categoryRouter.get('/:id', async (req, res) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const products = await Product.find({
      category: id,
    });

    res.status(200).json(products);
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
