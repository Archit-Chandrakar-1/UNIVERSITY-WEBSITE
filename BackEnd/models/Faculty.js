// backend/models/Faculty.js

import mongoose from 'mongoose';

const FacultySchema = new mongoose.Schema({
  department: { // Department affiliation
    type: String,
    required: true,
    trim: true,
  },
  name: { // Faculty Member Name
    type: String,
    required: true,
    trim: true,
  },
  position: { // E.g., "HOD", "Professor", "Assistant Professor"
    type: String,
    required: true,
    trim: true,
  },
  email: { // Contact Email
    type: String,
    trim: true,
  },
  phone: { // Contact Phone (Optional)
    type: String,
    trim: true,
  },
  photo_url: { // Cloudinary URL for photo
    type: String,
  },
  public_id: { // Cloudinary public ID
    type: String,
  },
  details: { // Detailed bio or message (for the modal)
    type: String,
    trim: true,
  },
  order: { // For custom display order
    type: Number,
    default: 0,
  }
}, { timestamps: true });

export default mongoose.model('Faculty', FacultySchema);