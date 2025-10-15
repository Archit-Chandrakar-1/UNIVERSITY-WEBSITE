// backend/models/Syllabus.js

import mongoose from 'mongoose';

const SyllabusSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  file_url: {
    type: String,
    required: true,
    trim: true,
  },
  public_id: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    required: true,
    trim: true,
  },
}, { timestamps: true });

export default mongoose.model('Syllabus', SyllabusSchema);