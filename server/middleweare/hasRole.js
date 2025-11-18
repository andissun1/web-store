import { Role } from '../model/role.js';
import { User } from '../model/user.js';
import jwt from 'jsonwebtoken';

export const hasRole = (rolesArray) => {
  return async (req, res, next) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ message: 'Не авторизован' });
      }
      const payload = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(payload.userID);

      const accessedRoles = await Promise.all(
        rolesArray.map(async (name) => {
          const role = await Role.findOne({ name });
          if (!role) throw new Error('Ошибка при получении ролей');
          return role._id.toString();
        })
      );

      if (!accessedRoles.includes(req.user.role.toString()))
        return res.send({ error: 'В доступе отказано' });

      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};
