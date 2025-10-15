// backend/models/departmentTestimonials.js

import mongoose from 'mongoose';

const DepartmentTestimonialSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true,
    trim: true,
  },
  quote: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  details: {
    type: String,
    required: true,
    trim: true,
  },
  order: { // For custom display order
    type: Number,
    default: 0,
  }
}, { timestamps: true });

export default mongoose.model('DepartmentTestimonial', DepartmentTestimonialSchema);