// // backend/models/departmentContentm.js


import mongoose from 'mongoose';

const AcademicSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  pdf_url: { // URL of the PDF certificate
    type: String,
    required: true,
    trim: true,
  },
  pdf_public_id: { // Cloudinary public ID for the PDF
    type: String,
    required: true,
    trim: true,
  },
  cover_image_url: { // URL of the cover image thumbnail
    type: String,
    required: true,
    trim: true,
  },
  cover_image_public_id: { // Cloudinary public ID for the image
    type: String,
    required: true,
    trim: true,
  },
  order: { // For custom display order
    type: Number,
    default: 0,
  }
}, { timestamps: true });

export default mongoose.model('Academic', AcademicSchema);