// backend/routes/programme.js

import express from 'express';
import Programme from '../models/programmem.js'; // <--- UPDATED IMPORT PATH

const router = express.Router();

// GET all programmes for a specific department
// Example: /api/programmes?department=MATS%20School%20of%20Management%20&%20Business%20Studies
router.get('/', async (req, res) => {
  try {
    const { department } = req.query;
    if (!department) {
      return res.status(400).json({ error: 'Department parameter is required.' });
    }
    const programmes = await Programme.find({ department }).sort({ order: 1, createdAt: 1 });
    res.json(programmes);
  } catch (error) {
    console.error('Error fetching programmes:', error);
    res.status(500).json({ error: 'Failed to retrieve programmes', details: error.message });
  }
});

// POST a new programme
router.post('/', async (req, res) => {
  try {
    const { department, name, duration, level, entry_qualification, fees_semester, order } = req.body;

    if (!department || !name || !duration || !level || !entry_qualification || !fees_semester) {
      return res.status(400).json({ error: 'All programme fields (department, name, duration, level, entry_qualification, fees_semester) are required.' });
    }

    const newProgramme = new Programme({
      department,
      name,
      duration,
      level,
      entry_qualification,
      fees_semester,
      order: order || 0,
    });

    await newProgramme.save();
    res.status(201).json(newProgramme);
  } catch (error) {
    console.error('Error adding programme:', error);
    res.status(500).json({ error: 'Failed to add programme', details: error.message });
  }
});

// PUT/PATCH update a programme by ID
router.put('/:id', async (req, res) => {
  try {
    const { department, name, duration, level, entry_qualification, fees_semester, order } = req.body;

    // It's generally better to allow partial updates for PUT/PATCH, but based on your schema,
    // all fields are required for a programme. If you intend to allow partial updates,
    // you would merge req.body with the existing document. For now, we'll keep
    // all fields required for simplicity.
    if (!department || !name || !duration || !level || !entry_qualification || !fees_semester) {
        return res.status(400).json({ error: 'All programme fields are required for update.' });
    }

    const updatedProgramme = await Programme.findByIdAndUpdate(
      req.params.id,
      { department, name, duration, level, entry_qualification, fees_semester, order },
      { new: true, runValidators: true } // Return the updated document and run schema validators
    );

    if (!updatedProgramme) {
      return res.status(404).json({ error: 'Programme not found' });
    }

    res.json(updatedProgramme);
  } catch (error) {
    console.error('Error updating programme:', error);
    res.status(500).json({ error: 'Failed to update programme', details: error.message });
  }
});

// DELETE a programme by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedProgramme = await Programme.findByIdAndDelete(req.params.id);

    if (!deletedProgramme) {
      return res.status(404).json({ error: 'Programme not found' });
    }

    res.status(200).json({ message: 'Programme deleted successfully' });
  } catch (error) {
    console.error('Error deleting programme:', error);
    res.status(500).json({ error: 'Failed to delete programme', details: error.message });
  }
});

export default router;