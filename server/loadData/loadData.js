import path from 'path';
import fs from 'fs';
import { Role } from '../model/role.js';
import { User } from '../model/user.js';
import { Product } from '../model/product.js';
import { Category } from '../model/category.js';
import bcrypt from 'bcryptjs';

export function loadInitialDBData() {
  const dbPath = path.resolve('loadData', './db.json');

  fs.readFile(dbPath, async (error, file) => {
    const data = JSON.parse(file);
    // Проверяю есть ли что-то в БД
    if (await Category.findOne({ name: 'Новинки' })) return;

    // Загрузка начальных данных
    await data.roles.forEach((role) => Role.create(role));
    data.users.forEach(async (user) => {
      if (user.email === 'admin@mail.ru') {
        const roleAdmin = await Role.findOne({ name: 'admin' });
        user.role = roleAdmin._id;
        user.roleName = roleAdmin.name;
      } else {
        const roleUser = await Role.findOne({ name: 'user' });
        user.role = roleUser._id;
        user.roleName = roleUser.name;
      }

      const hashedPassword = await bcrypt.hash(user.password, 10);
      User.create({ ...user, password: hashedPassword });
    });
    data.categories.forEach((category) => Category.create(category));
    data.products.forEach(async (product) => {
      const categoryDB = await Category.findOne({ name: product.category });
      product.category = categoryDB.id;
      Product.create(product);
    });

    if (error) console.log(error);
  });
}
