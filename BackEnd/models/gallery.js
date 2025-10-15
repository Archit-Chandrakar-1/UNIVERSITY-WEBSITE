// backend/models/Gallery.js

import mongoose from 'mongoose';

const GalleryPhotoSchema = new mongoose.Schema({
  title: {
    type: String,
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
  resource_type: {
    type: String,
    enum: ['image', 'video'],
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

const GalleryAlbumSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true,
    trim: true,
  },
  album_name: {
    type: String,
    required: true,
    trim: true,
  },
  album_date: {
    type: String,
    trim: true,
  },
  cover_image_url: {
    type: String,
    required: true,
    trim: true,
  },
  cover_image_public_id: {
    type: String,
    required: true,
    trim: true,
  },
  photos: [GalleryPhotoSchema]
}, { timestamps: true });

export default mongoose.model('GalleryAlbum', GalleryAlbumSchema);