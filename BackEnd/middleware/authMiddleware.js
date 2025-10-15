// backend/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'; 
import DepartmentUser from '../models/departmentUser.js';

// Middleware for generating JWT
const generateToken = (id, departmentName) => {
  return jwt.sign({ id, departmentName }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expires in 1 hour
  });
};

// Middleware to protect department-specific routes
const protectDepartmentRoute = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user information to the request
      req.departmentUser = await DepartmentUser.findById(decoded.id).select('-password'); // Exclude password
      req.departmentName = decoded.departmentName; // Attach departmentName from token

      next();
    } catch (error) {
      console.error('Not authorized, token failed:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
});

export { generateToken, protectDepartmentRoute };