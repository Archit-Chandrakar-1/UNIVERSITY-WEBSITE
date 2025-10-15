import express from 'express';
import Testimonial from '../models/testimonialsm.js'; // Corrected import path

const router = express.Router();

// GET all testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new testimonial
router.post('/', async (req, res) => {
  const { quote, name, details } = req.body;
  const newTestimonial = new Testimonial({
    quote,
    name,
    details,
  });

  try {
    const savedTestimonial = await newTestimonial.save();
    res.status(201).json(savedTestimonial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a testimonial by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedTestimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!deletedTestimonial) {
      return res.status(404).json({ message: 'Testimonial not found.' });
    }
    res.json({ message: 'Testimonial deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => { // You can also use router.patch
  try {
    const { quote, name, details } = req.body;
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { quote, name, details },
      { new: true, runValidators: true } // `new: true` returns the updated document
    );

    if (!updatedTestimonial) {
      return res.status(404).json({ message: 'Testimonial not found.' });
    }
    res.json(updatedTestimonial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


export default router;