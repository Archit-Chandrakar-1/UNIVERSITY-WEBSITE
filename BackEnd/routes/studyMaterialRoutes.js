// backend/routes/studyMaterialRoutes.js

import express from 'express';
import StudyMaterial from '../models/studyMaterial.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const router = express.Router();

// --- GET Study Materials for a specific department ---
router.get('/', async (req, res) => {
  try {
    const { department } = req.query;
    if (!department) {
      return res.status(400).json({ message: 'Department query parameter is required.' });
    }
    const materials = await StudyMaterial.find({ department }).sort({ createdAt: -1 });
    res.status(200).json(materials);
  } catch (error) {
    console.error('Error fetching study materials:', error);
    res.status(500).json({ message: 'Failed to retrieve study materials', details: error.message });
  }
});

// --- ADD a new Study Material (file or link) ---
router.post('/', async (req, res) => {
  let fileTempPath; // To store temp file path for cleanup
  try {
    const { department, title, link_url } = req.body;

    if (!department || !title) {
      return res.status(400).json({ message: 'Department and title are required.' });
    }

    let file_url;
    let public_id;

    if (req.files && req.files.media) {
      const file = req.files.media;
      fileTempPath = file.tempFilePath; // Store temp path
      
      const result = await cloudinary.uploader.upload(fileTempPath, {
        folder: `study_materials/${department.replace(/[^a-zA-Z0-9]/g, '_')}`,
        resource_type: 'raw', // Use 'raw' for documents like PDF, DOC, PPT
      });
      file_url = result.secure_url;
      public_id = result.public_id;
      fs.unlinkSync(fileTempPath); // Clean up temp file
    } else if (link_url) {
      // If no file, but a link_url is provided, use it
      file_url = undefined; // Ensure file_url is not set if it's a link-only
      public_id = undefined; // Ensure public_id is not set if it's a link-only
    } else {
      return res.status(400).json({ message: 'Either a file upload or a link URL is required for study material.' });
    }

    const newMaterial = new StudyMaterial({
      department,
      title,
      file_url,
      public_id,
      link_url: link_url || undefined, // Store link_url if provided
    });

    await newMaterial.save();
    res.status(201).json(newMaterial);
  } catch (error) {
    console.error('Error adding study material:', error);
    // Clean up temp file if an error occurred after upload but before saving to DB
    if (fileTempPath && fs.existsSync(fileTempPath)) {
      fs.unlinkSync(fileTempPath);
    }
    res.status(500).json({ message: 'Failed to add study material', details: error.message });
  }
});

// --- DELETE a Study Material ---
router.delete('/:id', async (req, res) => {
  try {
    const material = await StudyMaterial.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ message: 'Study material not found.' });
    }

    // If it's a file, delete from Cloudinary
    if (material.public_id) {
      await cloudinary.uploader.destroy(material.public_id, { resource_type: 'raw' });
    }

    await StudyMaterial.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Study material deleted successfully.' });
  } catch (error) {
    console.error('Error deleting study material:', error);
    res.status(500).json({ message: 'Failed to delete study material', details: error.message });
  }
});

export default router;