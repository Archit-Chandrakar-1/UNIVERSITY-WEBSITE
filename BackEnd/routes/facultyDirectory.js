// backend/routes/facultyDirectory.js

import express from 'express';
import Faculty from '../models/Faculty.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'; // Make sure fs is imported

const router = express.Router();

// GET all faculty for a specific department
router.get('/', async (req, res) => {
  try {
    const { department } = req.query;
    if (!department) {
      return res.status(400).json({ error: 'Department parameter is required.' });
    }
    const faculty = await Faculty.find({ department }).sort({ order: 1, name: 1 });
    res.json(faculty);
  } catch (error) {
    console.error('Error fetching faculty:', error);
    res.status(500).json({ error: 'Failed to retrieve faculty', details: error.message });
  }
});

// POST a new faculty member (with photo upload)
router.post('/', async (req, res) => {
  let file; // Declare file here
  try {
    const { department, name, position, email, phone, details, order } = req.body;

    if (!department || !name || !position || !email) {
      return res.status(400).json({ error: 'Name, position, email, and department are required.' });
    }

    let photo_url = '';
    let public_id = '';

    // Check if req.files and req.files.photo exist
    if (req.files && req.files.photo) {
      file = req.files.photo; // Assign file here
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: `faculty/${department.replace(/[^a-zA-Z0-9]/g, '_')}`,
        resource_type: 'image',
      });
      photo_url = result.secure_url;
      public_id = result.public_id;

      // Ensure temp file is cleaned up after upload
      if (fs.existsSync(file.tempFilePath)) { // Add check for existence
        fs.unlinkSync(file.tempFilePath);
      }
    }

    const newFaculty = new Faculty({
      department, name, position, email, phone, details, order, photo_url, public_id
    });

    await newFaculty.save();
    res.status(201).json(newFaculty);
  } catch (error) {
    console.error('Error adding faculty:', error);
    // Ensure cleanup of temp file on error as well
    if (file && fs.existsSync(file.tempFilePath)) {
      fs.unlinkSync(file.tempFilePath);
    }
    res.status(500).json({ error: 'Failed to add faculty', details: error.message });
  }
});

// DELETE a faculty member by ID
router.delete('/:id', async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) {
      return res.status(404).json({ error: 'Faculty member not found' });
    }

    if (faculty.public_id) {
      await cloudinary.uploader.destroy(faculty.public_id);
    }

    await Faculty.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Faculty member deleted successfully' });
  } catch (error) {
    console.error('Error deleting faculty:', error);
    res.status(500).json({ error: 'Failed to delete faculty', details: error.message });
  }
});

// PUT route for updating faculty (example - not fully implemented in previous snippet)
// You might need this later, but for now focus on POST/GET/DELETE
// router.put('/:id', async (req, res) => { /* ... */ });

export default router;