// backend/routes/departmentOverviewRoutes.js

import express from 'express';
import Department from '../models/departmentOverview.js';

const router = express.Router();

// GET a specific department's overview
router.get('/', async (req, res) => {
  try {
    const { departmentName } = req.query;
    if (!departmentName) {
      return res.status(400).json({ error: 'Department name query parameter is required.' });
    }
    const department = await Department.findOne({ departmentName });
    if (!department) {
      return res.status(404).json({ message: 'Department not found.' });
    }
    res.json(department);
  } catch (error) {
    console.error('Error fetching department overview:', error);
    res.status(500).json({ error: 'Failed to retrieve department overview', details: error.message });
  }
});

// POST or PUT to create/update a department overview
router.post('/', async (req, res) => {
  try {
    const { departmentName, description } = req.body;

    if (!departmentName || !description) {
      return res.status(400).json({ error: 'Department name and description are required.' });
    }

    const updatedDepartment = await Department.findOneAndUpdate(
      { departmentName },
      { description },
      { new: true, upsert: true, runValidators: true } // Upsert: true creates if it doesn't exist
    );

    res.status(201).json(updatedDepartment);
  } catch (error) {
    console.error('Error adding/updating department overview:', error);
    res.status(500).json({ error: 'Failed to add/update department overview', details: error.message });
  }
});

export default router;