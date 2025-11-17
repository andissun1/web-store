import { Router } from 'express';
import { Product } from '../model/product.js';
import { hasRole } from '../middleweare/hasRole.js';

export const productRouter = Router();

// get all
productRouter.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get by id
productRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// create
productRouter.post('/', hasRole(['admin']), async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update
productRouter.patch('/:id', hasRole(['admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete
productRouter.delete('/:id', hasRole(['admin']), async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: 'Товар удалён' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
