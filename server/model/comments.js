import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  title: String,
  stars: {
    type: Number,
    min: 1,
    max: 5,
  },
  text: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const Comment = mongoose.model('Comment', commentSchema);
