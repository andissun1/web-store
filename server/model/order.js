import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    numOfOrder: Number,
    status: {
      type: String,
      default: 'Собирается',
    },
    address: {
      type: String,
      required: true,
    },
    recipient: {
      name: String,
      phone: String,
    },
    total: {
      type: Number,
      required: true,
    },
    payment: String,
    comment: String,
    deliveryCost: Number,
    products: [{}],
  },
  { timestamps: true }
);

// Схема для ведения общего счёта заказов и выдачи удобного id (numOfOrder)
const CounterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  counter: { type: Number, default: 0 },
});
const Counter = mongoose.model('Counter', CounterSchema);
// __________

orderSchema.pre('save', async function (next) {
  let order = this;
  try {
    const CounterObj = await Counter.findOneAndUpdate(
      { name: 'OrderID' },
      { $inc: { counter: 1 } },
      { new: true, upsert: true }
    );
    order.numOfOrder = CounterObj.counter;
  } catch (error) {
    return next(error);
  }
  next();
});

export const Order = mongoose.model('Order', orderSchema);
