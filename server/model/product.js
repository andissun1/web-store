import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    short_description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    stock_quantity: {
      type: Number,
      default: 1,
    },
    image_URL: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Categories',
      // required: true,
    },
    specifications: {},
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model('Product', productSchema);
