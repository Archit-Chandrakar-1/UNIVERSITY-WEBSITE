// backend/routes/authDepartment.js
import express from 'express';
import DepartmentUser from '../models/DepartmentUser.js';
import { generateToken } from '../middleware/authMiddleware.js'; // Import the token generator

const router = express.Router();

// @desc    Register a new department user
// @route   POST /api/auth/department/register
// @access  Public (for initial setup) / Admin-only (after initial setup)
router.post('/register', async (req, res) => {
  const { departmentName, password } = req.body;

  if (!departmentName || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    const userExists = await DepartmentUser.findOne({ departmentName });

    if (userExists) {
      return res.status(400).json({ message: 'Department already registered' });
    }

    const user = await DepartmentUser.create({
      departmentName,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        departmentName: user.departmentName,
        token: generateToken(user._id, user.departmentName),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Department registration error:', error);
    res.status(500).json({ message: 'Internal Server Error', details: error.message });
  }
});

// @desc    Authenticate a department user & get token
// @route   POST /api/auth/department/login
// @access  Public
router.post('/login', async (req, res) => {
  const { departmentName, password } = req.body;

  if (!departmentName || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    const user = await DepartmentUser.findOne({ departmentName });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        departmentName: user.departmentName,
        token: generateToken(user._id, user.departmentName),
      });
    } else {
      res.status(401).json({ message: 'Invalid department name or password' });
    }
  } catch (error) {
    console.error('Department login error:', error);
    res.status(500).json({ message: 'Internal Server Error', details: error.message });
  }
});

export default router;