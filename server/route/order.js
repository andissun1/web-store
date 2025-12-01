import { Router } from 'express';
import { hasRole } from '../middleweare/hasRole.js';
import { Order } from '../model/order.js';
import { isAuth } from '../middleweare/isAuth.js';
import { User } from '../model/user.js';

export const orderRouter = Router();

// get all
orderRouter.get('/', hasRole(['admin']), async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get one
orderRouter.get('/:id', isAuth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) throw new Error('Заказ не найден');

    const user = await User.findById(req.user);

    if (user._id !== order.customer._id && user.roleName !== 'admin')
      throw new Error('Нет прав на просмотр заказа');

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// create
orderRouter.post('/', isAuth, async (req, res) => {
  try {
    const newOrder = await Order.create({ ...req.body, customer: req.user });
    await User.findByIdAndUpdate(req.user, {
      $push: { orders: newOrder._id },
    });
    res.status(200).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update
orderRouter.patch('/:id', hasRole(['admin']), async (req, res) => {
  try {
    const newOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        customer: req.user._id,
      },
      { new: true }
    );

    if (!newOrder) throw new Error('Заказ не найден');

    res.status(200).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete
orderRouter.delete('/:id', hasRole(['admin']), async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('customer', '_id');
    const user = await User.findById(order.customer._id);
    user.orders.remove(order._id);
    user.save();

    await Order.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Заказ удалён администратором' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
