// backend/routes/departmentSyllabus.js

import express from 'express';
import Syllabus from '../models/syllabus.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { department } = req.query;
    if (!department) {
      return res.status(400).json({ message: 'Department is required.' });
    }
    const syllabus = await Syllabus.find({ department });
    res.json(syllabus);
  } catch (error) {
    console.error('Error fetching syllabus:', error);
    res.status(500).json({ message: 'Failed to retrieve syllabus', details: error.message });
  }
});

router.post('/', async (req, res) => {
  let file;
  try {
    const { title, department } = req.body;
    if (!title || !department || !req.files || !req.files.media) {
      return res.status(400).json({ message: 'Title, department, and a file are required.' });
    }

    file = req.files.media;
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: `syllabus/${department.replace(/[^a-zA-Z0-9]/g, '_')}`,
      resource_type: 'raw',
    });

    fs.unlinkSync(file.tempFilePath);

    const newSyllabus = new Syllabus({
      title,
      department,
      file_url: result.secure_url,
      public_id: result.public_id,
    });

    await newSyllabus.save();
    res.status(201).json(newSyllabus);
  } catch (error) {
    console.error('Error adding syllabus:', error);
    if (file && fs.existsSync(file.tempFilePath)) {
      fs.unlinkSync(file.tempFilePath);
    }
    res.status(500).json({ message: 'Failed to add syllabus', details: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const syllabus = await Syllabus.findById(req.params.id);
    if (!syllabus) {
      return res.status(404).json({ message: 'Syllabus not found.' });
    }

    if (syllabus.public_id) {
      await cloudinary.uploader.destroy(syllabus.public_id, { resource_type: 'raw' });
    }

    await Syllabus.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Syllabus deleted successfully.' });
  } catch (error) {
    console.error('Error deleting syllabus:', error);
    res.status(500).json({ message: 'Failed to delete syllabus', details: error.message });
  }
});

export default router;