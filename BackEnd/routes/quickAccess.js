import express from 'express';
import QuickAccess from '../models/quickAccessm.js';
import { v2 as cloudinary } from 'cloudinary';

const router = express.Router();

// GET all quick access sections and items.
router.get('/', async (req, res) => {
  try {
    const sections = await QuickAccess.find();
    res.json(sections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET items for a specific section (by label)
router.get('/:label', async (req, res) => {
  const { label } = req.params;
  try {
    const section = await QuickAccess.findOne({ label: decodeURIComponent(label) });
    if (!section) {
      return res.status(404).json({ message: 'Section not found.' });
    }
    res.json(section);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new timetable item
router.post('/timetables', async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    
    const { name } = req.body;
    const file = req.files.file;
    
    const result = await cloudinary.uploader.upload(file.tempFilePath, { folder: 'timetables', resource_type: 'raw'  });
    
    const newItem = {
      type: 'timetable',
      name: name,
      url: result.secure_url,
    };
    
    let section = await QuickAccess.findOne({ label: 'Examination Timetable' });
    if (!section) {
      section = new QuickAccess({ label: 'Examination Timetable', items: [] });
    }
    section.items.push(newItem);
    await section.save();
    
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST a new notification
router.post('/notifications', async (req, res) => {
  try {
    const { message, link } = req.body;
    
    const newItem = {
      type: 'notification',
      message: message,
      link: link,
    };
    
    let section = await QuickAccess.findOne({ label: 'Examination Notification' });
    if (!section) {
      section = new QuickAccess({ label: 'Examination Notification', items: [] });
    }
    section.items.push(newItem);
    await section.save();
    
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST a new brochure
router.post('/brochures', async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    const { name } = req.body;
    const file = req.files.file;
    
    const result = await cloudinary.uploader.upload(file.tempFilePath, { folder: 'brochures', resource_type: 'raw'  });
    
    const newItem = {
      type: 'brochure',
      name: name,
      url: result.secure_url,
    };
    
    let section = await QuickAccess.findOne({ label: 'Information Brochure' });
    if (!section) {
      section = new QuickAccess({ label: 'Information Brochure', items: [] });
    }
    section.items.push(newItem);
    await section.save();
    
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE an item from a section
router.delete('/:label/:id', async (req, res) => {
  try {
    const { label, id } = req.params;
    const section = await QuickAccess.findOne({ label: decodeURIComponent(label) });
    if (!section) {
      return res.status(404).json({ message: 'Section not found.' });
    }

    // Check if the item has a URL before trying to delete from Cloudinary
    const itemToDelete = section.items.id(id);
    if (itemToDelete && itemToDelete.type !== 'notification' && itemToDelete.url) {
        // Extract publicId from Cloudinary URL for deletion
        const publicId = itemToDelete.url.substring(itemToDelete.url.lastIndexOf('/') + 1, itemToDelete.url.lastIndexOf('.'));
        await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
    }
    
    // Use the pull() method to remove the subdocument
    section.items.pull(id);
    await section.save();
    
    res.status(200).json({ message: 'Item deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;