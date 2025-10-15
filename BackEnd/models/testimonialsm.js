import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  quote: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('Testimonial', testimonialSchema);