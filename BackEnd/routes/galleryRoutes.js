// backend/routes/galleryRoutes.js

import express from 'express';
import GalleryAlbum from '../models/gallery.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const router = express.Router();

// GET all albums for a specific department
router.get('/', async (req, res) => {
  try {
    const { department } = req.query;
    if (!department) {
      return res.status(400).json({ error: 'Department parameter is required.' });
    }
    const albums = await GalleryAlbum.find({ department }).sort({ album_date: -1 });
    res.json(albums);
  } catch (error) {
    console.error('Error fetching albums:', error);
    res.status(500).json({ error: 'Failed to retrieve albums', details: error.message });
  }
});

// GET a single album and its photos
router.get('/:id', async (req, res) => {
  try {
    const album = await GalleryAlbum.findById(req.params.id);
    if (!album) {
      return res.status(404).json({ error: 'Album not found.' });
    }
    res.json(album);
  } catch (error) {
    console.error('Error fetching album:', error);
    res.status(500).json({ error: 'Failed to retrieve album', details: error.message });
  }
});

// POST a new album (with cover photo upload)
router.post('/', async (req, res) => {
  let coverImageFile;
  try {
    const { department, album_name, album_date } = req.body;
    if (!department || !album_name || !req.files || !req.files.coverImage) {
      return res.status(400).json({ error: 'Department, album name, and cover image are required.' });
    }

    coverImageFile = req.files.coverImage;
    const result = await cloudinary.uploader.upload(coverImageFile.tempFilePath, {
      folder: `gallery_albums/${department.replace(/[^a-zA-Z0-9]/g, '_')}`,
      resource_type: 'image',
    });

    fs.unlinkSync(coverImageFile.tempFilePath);

    const newAlbum = new GalleryAlbum({
      department,
      album_name,
      album_date,
      cover_image_url: result.secure_url,
      cover_image_public_id: result.public_id,
      photos: []
    });

    await newAlbum.save();
    res.status(201).json(newAlbum);
  } catch (error) {
    console.error('Error adding album:', error);
    if (coverImageFile && fs.existsSync(coverImageFile.tempFilePath)) {
      fs.unlinkSync(coverImageFile.tempFilePath);
    }
    res.status(500).json({ error: 'Failed to add album', details: error.message });
  }
});

// POST a new photo to an existing album
router.post('/:albumId/photos', async (req, res) => {
  let photoFile;
  try {
    const { title } = req.body;
    if (!req.files || !req.files.media) {
      return res.status(400).json({ error: 'Media file is required.' });
    }
    photoFile = req.files.media;
    const album = await GalleryAlbum.findById(req.params.albumId);
    if (!album) {
      return res.status(404).json({ error: 'Album not found.' });
    }

    const result = await cloudinary.uploader.upload(photoFile.tempFilePath, {
      folder: `gallery_albums/${album.department.replace(/[^a-zA-Z0-9]/g, '_')}/${album.album_name.replace(/[^a-zA-Z0-9]/g, '_')}`,
      resource_type: 'auto',
    });

    fs.unlinkSync(photoFile.tempFilePath);

    const newPhoto = {
      title: title || photoFile.name,
      file_url: result.secure_url,
      public_id: result.public_id,
      resource_type: result.resource_type,
    };

    album.photos.push(newPhoto);
    await album.save();
    res.status(201).json(newPhoto);
  } catch (error) {
    console.error('Error adding photo:', error);
    if (photoFile && fs.existsSync(photoFile.tempFilePath)) {
      fs.unlinkSync(photoFile.tempFilePath);
    }
    res.status(500).json({ error: 'Failed to add photo', details: error.message });
  }
});

// DELETE an album and all its photos from Cloudinary
router.delete('/:albumId', async (req, res) => {
  try {
    const album = await GalleryAlbum.findById(req.params.albumId);
    if (!album) {
      return res.status(404).json({ error: 'Album not found.' });
    }

    // Delete all photos associated with the album from Cloudinary
    await Promise.all(album.photos.map(photo => {
      if (photo.public_id) {
        return cloudinary.uploader.destroy(photo.public_id, { resource_type: photo.resource_type });
      }
      return Promise.resolve();
    }));

    // Delete the cover image
    if (album.cover_image_public_id) {
      await cloudinary.uploader.destroy(album.cover_image_public_id);
    }

    await GalleryAlbum.findByIdAndDelete(req.params.albumId);
    res.status(200).json({ message: 'Album and all its contents deleted successfully.' });
  } catch (error) {
    console.error('Error deleting album:', error);
    res.status(500).json({ error: 'Failed to delete album', details: error.message });
  }
});

// DELETE a specific photo from an album
router.delete('/:albumId/photos/:photoId', async (req, res) => {
  try {
    const album = await GalleryAlbum.findById(req.params.albumId);
    if (!album) {
      return res.status(404).json({ error: 'Album not found.' });
    }

    const photo = album.photos.id(req.params.photoId);
    if (!photo) {
      return res.status(404).json({ error: 'Photo not found in this album.' });
    }

    if (photo.public_id) {
      await cloudinary.uploader.destroy(photo.public_id, { resource_type: photo.resource_type });
    }

    album.photos.pull(req.params.photoId);
    await album.save();
    res.status(200).json({ message: 'Photo deleted successfully.' });
  } catch (error) {
    console.error('Error deleting photo:', error);
    res.status(500).json({ error: 'Failed to delete photo', details: error.message });
  }
});


export default router;