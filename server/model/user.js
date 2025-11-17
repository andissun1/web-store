import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    created_at: {
      type: Date,
      default: Date.now(),
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      required: true,
    },
    addresses: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model('User', userSchema);
