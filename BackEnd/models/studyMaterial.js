// backend/models/StudyMaterial.js

import mongoose from 'mongoose';

const StudyMaterialSchema = new mongoose.Schema({
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
  file_url: {
    type: String,
    trim: true,
    // Required if link_url is not provided
    validate: {
      validator: function(v) {
        return this.link_url || (v && v.length > 0);
      },
      message: 'Either file_url or link_url must be provided.'
    }
  },
  public_id: {
    type: String,
    trim: true,
  },
  link_url: {
    type: String,
    trim: true,
    // Required if file_url is not provided
    validate: {
      validator: function(v) {
        return this.file_url || (v && v.length > 0);
      },
      message: 'Either file_url or link_url must be provided.'
    }
  },
}, { timestamps: true });

// Ensure at least one of file_url or link_url is present
StudyMaterialSchema.pre('validate', function(next) {
  if (!this.file_url && !this.link_url) {
    this.invalidate('file_url', 'Either a file or a link must be provided.', 'required');
    this.invalidate('link_url', 'Either a file or a link must be provided.', 'required');
  }
  next();
});

export default mongoose.model('StudyMaterial', StudyMaterialSchema);