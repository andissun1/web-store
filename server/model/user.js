import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: 'Введите корректную почту',
      },
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      validate: {
        validator: validator.isMobilePhone,
        message: 'Введите корректый номер телефона',
      },
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
