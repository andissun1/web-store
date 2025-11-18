import { Router } from 'express';
import { Role } from '../model/role.js';
import { hasRole } from '../middleweare/hasRole.js';

export const roleRouter = Router();

// get all
roleRouter.get('/', hasRole(['admin']), async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get one
roleRouter.get('/:id', hasRole(['admin']), async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// add role
roleRouter.post('/', hasRole(['admin']), async (req, res) => {
  try {
    const newRole = await Role.create(req.body);
    res.status(201).json(newRole);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update role
roleRouter.patch('/:id', hasRole(['admin']), async (req, res) => {
  try {
    const newRole = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(newRole);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
