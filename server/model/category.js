import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  img: String,
  name: {
    type: String,
    required: true,
  },
});

export const Category = mongoose.model('Category', categorySchema);
