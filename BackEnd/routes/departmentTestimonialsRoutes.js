// backend/routes/departmentTestimonialsRoutes.js

import express from 'express';
import DepartmentTestimonial from '../models/departmentTestimonials.js';

const router = express.Router();

// GET all testimonials for a specific department
router.get('/', async (req, res) => {
  try {
    const { department } = req.query;
    if (!department) {
      return res.status(400).json({ error: 'Department parameter is required.' });
    }
    const testimonials = await DepartmentTestimonial.find({ department }).sort({ order: 1, createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ error: 'Failed to retrieve testimonials', details: error.message });
  }
});

// POST a new testimonial
router.post('/', async (req, res) => {
  try {
    const { department, quote, name, details, order } = req.body;
    if (!department || !quote || !name || !details) {
      return res.status(400).json({ error: 'Department, quote, name, and details are required.' });
    }

    const newTestimonial = new DepartmentTestimonial({
      department, quote, name, details, order
    });

    await newTestimonial.save();
    res.status(201).json(newTestimonial);
  } catch (error) {
    console.error('Error adding testimonial:', error);
    res.status(500).json({ error: 'Failed to add testimonial', details: error.message });
  }
});

// PUT/PATCH update a testimonial by ID
router.put('/:id', async (req, res) => {
  try {
    const { department, quote, name, details, order } = req.body;
    if (!department || !quote || !name || !details) {
      return res.status(400).json({ error: 'All testimonial fields are required for update.' });
    }

    const updatedTestimonial = await DepartmentTestimonial.findByIdAndUpdate(
      req.params.id,
      { department, quote, name, details, order },
      { new: true, runValidators: true }
    );

    if (!updatedTestimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    res.json(updatedTestimonial);
  } catch (error) {
    console.error('Error updating testimonial:', error);
    res.status(500).json({ error: 'Failed to update testimonial', details: error.message });
  }
});

// DELETE a testimonial by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedTestimonial = await DepartmentTestimonial.findByIdAndDelete(req.params.id);
    if (!deletedTestimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    res.status(200).json({ message: 'Testimonial deleted successfully.' });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    res.status(500).json({ error: 'Failed to delete testimonial', details: error.message });
  }
});

export default router;