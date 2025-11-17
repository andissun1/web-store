import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  stars: {
    type: Number,
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
