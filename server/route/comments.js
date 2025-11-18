import { Router } from 'express';
import { Comment } from '../model/comments.js';
import { isAuth } from '../middleweare/isAuth.js';
import { Product } from '../model/product.js';
import { hasRole } from '../middleweare/hasRole.js';

export const commentsRouter = Router();

// get all
commentsRouter.get('/', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// create
commentsRouter.post('/:productID', isAuth, async (req, res) => {
  try {
    req.body.author = req.user;
    const { productID } = req.params;
    const comment = await Comment.create(req.body);

    // Добавляем новый комменатрий к товару
    await Product.findByIdAndUpdate(productID, {
      $push: { comments: comment._id },
    });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update
commentsRouter.patch('/:id', isAuth, async (req, res) => {
  try {
    const commentInfo = req.body;
    const commentID = req.params.id;

    const comment = await Comment.findById(commentID);
    if (!comment) throw new Error('Комментарий не найден');

    if (comment.author.toString() !== req.user)
      throw new Error('Вы не можете редактировать этот комментарий');

    const updatedComment = await Comment.findByIdAndUpdate(commentID, commentInfo, {
      new: true,
    });

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete
commentsRouter.delete('/:id/:productID', hasRole(['admin', 'user']), async (req, res) => {
  try {
    const commentID = req.params.id;
    const productID = req.params.productID;

    const comment = await Comment.findById(commentID);
    if (!comment) throw new Error('Комментарий не найден');

    if (comment.author.toString() === req.user.id) {
      await Comment.deleteOne({ _id: commentID });
      // Удаляю из массива зависимостей в продукте
      const product = await Product.findById(productID);
      product.comments.remove(commentID);
      product.save();
      return res.status(200).json({ message: 'Комментарий удалён' });
    }

    const userRole = await req.user.populate('role');

    if (userRole.role.name === 'admin') {
      await Comment.deleteOne({ _id: commentID });
      const product = await Product.findById(productID);
      product.comments = product.comments.remove(commentID);
      product.save();

      res.status(200).json({ message: 'Комментарий удалён администратором' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
