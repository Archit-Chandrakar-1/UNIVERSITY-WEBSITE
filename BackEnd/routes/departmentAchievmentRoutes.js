// backend/routes/departmentAchievementsRoutes.js

import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import Achievement from '../models/departmentAchievments.js';

const router = express.Router();

// GET achievements for a specific department
router.get('/', async (req, res) => {
  try {
    const { department } = req.query; // Expects 'department'
    if (!department) {
      return res.status(400).json({ error: 'Department parameter is required.' });
    }
    const achievements = await Achievement.find({ department }).sort({ order: 1, createdAt: -1 });
    res.json(achievements);
  } catch (error) {
    // ...
  }
});

// POST a new achievement (with PDF and image upload)
router.post('/', async (req, res) => {
  let pdfFile, imageFile;
  try {
    const { department, title, description } = req.body;
    if (!department || !title || !req.files || !req.files.pdfFile || !req.files.imageFile) {
      return res.status(400).json({ error: 'Department, title, PDF, and cover image are required.' });
    }

    pdfFile = req.files.pdfFile;
    imageFile = req.files.imageFile;

    // Upload PDF
    const pdfResult = await cloudinary.uploader.upload(pdfFile.tempFilePath, {
      folder: `achievements/${department.replace(/[^a-zA-Z0-9]/g, '_')}`,
      resource_type: 'raw',
    });

    // Upload Cover Image
    const imageResult = await cloudinary.uploader.upload(imageFile.tempFilePath, {
      folder: `achievements/${department.replace(/[^a-zA-Z0-9]/g, '_')}`,
      resource_type: 'image',
    });

    fs.unlinkSync(pdfFile.tempFilePath);
    fs.unlinkSync(imageFile.tempFilePath);

    const newAchievement = new Achievement({
      department,
      title,
      description,
      pdf_url: pdfResult.secure_url,
      pdf_public_id: pdfResult.public_id,
      cover_image_url: imageResult.secure_url,
      cover_image_public_id: imageResult.public_id,
    });

    await newAchievement.save();
    res.status(201).json(newAchievement);
  } catch (error) {
    console.error('Error adding achievement:', error);
    if (pdfFile && fs.existsSync(pdfFile.tempFilePath)) {
      fs.unlinkSync(pdfFile.tempFilePath);
    }
    if (imageFile && fs.existsSync(imageFile.tempFilePath)) {
      fs.unlinkSync(imageFile.tempFilePath);
    }
    res.status(500).json({ error: 'Failed to add achievement', details: error.message });
  }
});

// PUT update an achievement by ID
router.put('/:id', async (req, res) => {
  let pdfFile, imageFile;
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) {
      return res.status(404).json({ error: 'Achievement not found' });
    }

    const { title, description, order } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required.' });
    }

    // Update basic fields
    achievement.title = title;
    achievement.description = description || achievement.description;
    achievement.order = order !== undefined ? order : achievement.order;

    // Handle PDF file update if provided
    if (req.files && req.files.pdfFile) {
      pdfFile = req.files.pdfFile;
      
      // Delete old PDF from Cloudinary
      if (achievement.pdf_public_id) {
        await cloudinary.uploader.destroy(achievement.pdf_public_id, { resource_type: 'raw' });
      }

      // Upload new PDF
      const pdfResult = await cloudinary.uploader.upload(pdfFile.tempFilePath, {
        folder: `achievements/${achievement.department.replace(/[^a-zA-Z0-9]/g, '_')}`,
        resource_type: 'raw',
      });

      achievement.pdf_url = pdfResult.secure_url;
      achievement.pdf_public_id = pdfResult.public_id;
    }

    // Handle image file update if provided
    if (req.files && req.files.imageFile) {
      imageFile = req.files.imageFile;
      
      // Delete old image from Cloudinary
      if (achievement.cover_image_public_id) {
        await cloudinary.uploader.destroy(achievement.cover_image_public_id, { resource_type: 'image' });
      }

      // Upload new image
      const imageResult = await cloudinary.uploader.upload(imageFile.tempFilePath, {
        folder: `achievements/${achievement.department.replace(/[^a-zA-Z0-9]/g, '_')}`,
        resource_type: 'image',
      });

      achievement.cover_image_url = imageResult.secure_url;
      achievement.cover_image_public_id = imageResult.public_id;
    }

    // Clean up temporary files
    if (pdfFile && fs.existsSync(pdfFile.tempFilePath)) {
      fs.unlinkSync(pdfFile.tempFilePath);
    }
    if (imageFile && fs.existsSync(imageFile.tempFilePath)) {
      fs.unlinkSync(imageFile.tempFilePath);
    }

    await achievement.save();
    res.json(achievement);
  } catch (error) {
    console.error('Error updating achievement:', error);
    if (pdfFile && fs.existsSync(pdfFile.tempFilePath)) {
      fs.unlinkSync(pdfFile.tempFilePath);
    }
    if (imageFile && fs.existsSync(imageFile.tempFilePath)) {
      fs.unlinkSync(imageFile.tempFilePath);
    }
    res.status(500).json({ error: 'Failed to update achievement', details: error.message });
  }
});

// DELETE an achievement by ID
router.delete('/:id', async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) {
      return res.status(404).json({ error: 'Achievement not found' });
    }

    // Delete PDF and Cover Image from Cloudinary
    if (achievement.pdf_public_id) {
      await cloudinary.uploader.destroy(achievement.pdf_public_id, { resource_type: 'raw' });
    }
    if (achievement.cover_image_public_id) {
      await cloudinary.uploader.destroy(achievement.cover_image_public_id, { resource_type: 'image' });
    }

    await Achievement.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Achievement deleted successfully.' });
  } catch (error) {
    console.error('Error deleting achievement:', error);
    res.status(500).json({ error: 'Failed to delete achievement', details: error.message });
  }
});

export default router;