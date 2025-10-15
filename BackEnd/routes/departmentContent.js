// backend/routes/departmentContentRoutes.js

import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import Academic from '../models/departmentContentm.js'
// import Academic from '../models/departmentAchievments.js';

const router = express.Router();

// GET academics for a specific department
router.get('/', async (req, res) => {
  try {
    const { department } = req.query; // Expects 'department'
    if (!department) {
      return res.status(400).json({ error: 'Department parameter is required.' });
    }
    const academics = await Academic.find({ department }).sort({ order: 1, createdAt: -1 });
    res.json(academics);
  } catch (error) {
    // ...
  }
});

// POST a new academic (with PDF and image upload)
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
      folder: `academics/${department.replace(/[^a-zA-Z0-9]/g, '_')}`,
      resource_type: 'raw',
    });

    // Upload Cover Image
    const imageResult = await cloudinary.uploader.upload(imageFile.tempFilePath, {
      folder: `academics/${department.replace(/[^a-zA-Z0-9]/g, '_')}`,
      resource_type: 'image',
    });

    fs.unlinkSync(pdfFile.tempFilePath);
    fs.unlinkSync(imageFile.tempFilePath);

    const newAcademic = new Academic({
      department,
      title,
      description,
      pdf_url: pdfResult.secure_url,
      pdf_public_id: pdfResult.public_id,
      cover_image_url: imageResult.secure_url,
      cover_image_public_id: imageResult.public_id,
    });

    await newAcademic.save();
    res.status(201).json(newAcademic);
  } catch (error) {
    console.error('Error adding academic:', error);
    if (pdfFile && fs.existsSync(pdfFile.tempFilePath)) {
      fs.unlinkSync(pdfFile.tempFilePath);
    }
    if (imageFile && fs.existsSync(imageFile.tempFilePath)) {
      fs.unlinkSync(imageFile.tempFilePath);
    }
    res.status(500).json({ error: 'Failed to add academic', details: error.message });
  }
});

// PUT update an academic by ID
router.put('/:id', async (req, res) => {
  let pdfFile, imageFile;
  try {
    const academic = await Academic.findById(req.params.id);
    if (!academic) {
      return res.status(404).json({ error: 'Academic not found' });
    }

    const { title, description, order } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required.' });
    }

    // Update basic fields
    academic.title = title;
    academic.description = description || academic.description;
    academic.order = order !== undefined ? order : academic.order;

    // Handle PDF file update if provided
    if (req.files && req.files.pdfFile) {
      pdfFile = req.files.pdfFile;
      
      // Delete old PDF from Cloudinary
      if (academic.pdf_public_id) {
        await cloudinary.uploader.destroy(academic.pdf_public_id, { resource_type: 'raw' });
      }

      // Upload new PDF
      const pdfResult = await cloudinary.uploader.upload(pdfFile.tempFilePath, {
        folder: `academics/${academic.department.replace(/[^a-zA-Z0-9]/g, '_')}`,
        resource_type: 'raw',
      });

      academic.pdf_url = pdfResult.secure_url;
      academic.pdf_public_id = pdfResult.public_id;
    }

    // Handle image file update if provided
    if (req.files && req.files.imageFile) {
      imageFile = req.files.imageFile;
      
      // Delete old image from Cloudinary
      if (academic.cover_image_public_id) {
        await cloudinary.uploader.destroy(academic.cover_image_public_id, { resource_type: 'image' });
      }

      // Upload new image
      const imageResult = await cloudinary.uploader.upload(imageFile.tempFilePath, {
        folder: `academics/${academic.department.replace(/[^a-zA-Z0-9]/g, '_')}`,
        resource_type: 'image',
      });

      academic.cover_image_url = imageResult.secure_url;
      academic.cover_image_public_id = imageResult.public_id;
    }

    // Clean up temporary files
    if (pdfFile && fs.existsSync(pdfFile.tempFilePath)) {
      fs.unlinkSync(pdfFile.tempFilePath);
    }
    if (imageFile && fs.existsSync(imageFile.tempFilePath)) {
      fs.unlinkSync(imageFile.tempFilePath);
    }

    await academic.save();
    res.json(academic);
  } catch (error) {
    console.error('Error updating academic:', error);
    if (pdfFile && fs.existsSync(pdfFile.tempFilePath)) {
      fs.unlinkSync(pdfFile.tempFilePath);
    }
    if (imageFile && fs.existsSync(imageFile.tempFilePath)) {
      fs.unlinkSync(imageFile.tempFilePath);
    }
    res.status(500).json({ error: 'Failed to update academic', details: error.message });
  }
});

// DELETE an academic by ID
router.delete('/:id', async (req, res) => {
  try {
    const academic = await Academic.findById(req.params.id);
    if (!academic) {
      return res.status(404).json({ error: 'Academic not found' });
    }

    // Delete PDF and Cover Image from Cloudinary
    if (academic.pdf_public_id) {
      await cloudinary.uploader.destroy(academic.pdf_public_id, { resource_type: 'raw' });
    }
    if (academic.cover_image_public_id) {
      await cloudinary.uploader.destroy(academic.cover_image_public_id, { resource_type: 'image' });
    }

    await Academic.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Academic deleted successfully.' });
  } catch (error) {
    console.error('Error deleting academic:', error);
    res.status(500).json({ error: 'Failed to delete academic', details: error.message });
  }
});

export default router;