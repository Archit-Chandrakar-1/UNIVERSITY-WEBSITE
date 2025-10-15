import express from 'express';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'; // Import Node.js file system module for unlinking temp files

const router = express.Router();

// Mongoose Schema
const carouselMediaSchema = new mongoose.Schema({
  public_id: {
    type: String,
    required: true,
  },
  media_url: { // <--- THIS MUST BE `media_url` AND IS THE KEY CHANGE
    type: String,
    required: true,
  },
  resource_type: { // Store Cloudinary's resource_type
    type: String,
    required: true,
    enum: ['image', 'video',], // Define allowed types
  },
  caption: String,
}, { timestamps: true });

const CarouselMedia = mongoose.model('CarouselMedia', carouselMediaSchema);

// GET all carousel media
router.get('/', async (_req, res) => {
  try {
    const media = await CarouselMedia.find();
    res.json(media);
  } catch (error) {
    console.error('Retrieve media error:', error);
    res.status(500).json({ error: 'Failed to retrieve media' });
  }
});

// POST a new carousel media file
// router.post('/', async (req, res) => {
//   let file; // <--- THIS MUST BE DECLARED HERE FOR FINALLY BLOCK ACCESS
//   try {
//     if (!req.files || Object.keys(req.files).length === 0 || !req.files.media) {
//       return res.status(400).send('No media file was uploaded.');
//     }

//     file = req.files.media; // Assign file here
//     const caption = req.body.caption || '';

//     // Upload image/video to Cloudinary
//     const result = await cloudinary.uploader.upload(file.tempFilePath, {
//       folder: 'carousel', // Specify a folder in Cloudinary
//       resource_type: 'auto', // Cloudinary will auto-detect if it's image/video
//     });

//     const newMedia = new CarouselMedia({
//       public_id: result.public_id,
//       media_url: result.secure_url, // <--- THIS MUST BE `media_url`
//       resource_type: result.resource_type, // Store the detected resource type
//       caption: caption,
//     });

//     await newMedia.save();
//     res.status(201).json(newMedia);
//   } catch (error) {
//     console.error('Upload Error:', error);
//     console.error('Upload Error (Detailed):', error); 
//     res.status(500).json({ error: 'Failed to upload media', details: error.message});
//   } finally {
//     // Clean up the temporary file after upload
//     if (file && file.tempFilePath) { // Now 'file' is defined
//       fs.unlink(file.tempFilePath, (err) => {
//         if (err) console.error("Error deleting temp file:", err);
//       });
//     }
//   }
// });

router.post('/', async (req, res) => {
  let file;
  try {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.media) {
      return res.status(400).send('No media file was uploaded.');
    }

    file = req.files.media;
    const caption = req.body.caption || '';

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'carousel',
      resource_type: 'auto',
    });

    const newMedia = new CarouselMedia({
      public_id: result.public_id,
      media_url: result.secure_url,
      resource_type: result.resource_type,
      caption: caption,
    });

    await newMedia.save();
    res.status(201).json(newMedia);
  } catch (error) {
    console.error('Upload Error (Detailed):', error); // <--- THIS IS THE KEY CHANGE
    res.status(500).json({ error: 'Failed to upload media', details: error.message }); // <--- AND THIS
  } finally {
    if (file && file.tempFilePath) {
      fs.unlink(file.tempFilePath, (err) => {
        if (err) console.error("Error deleting temp file:", err);
      });
    }
  }
});

// DELETE a carousel media file
router.delete('/:id', async (req, res) => {
  try {
    const media = await CarouselMedia.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ error: 'Media not found' });
    }

    // Delete image/video from Cloudinary, using the stored resource_type
    await cloudinary.uploader.destroy(media.public_id, {
      resource_type: media.resource_type // Pass the stored resource_type
    });

    // Delete document from MongoDB
    await CarouselMedia.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Media deleted successfully' });
  } catch (error) {
    console.error('Delete Error:', error);
    res.status(500).json({ error: 'Failed to delete media' });
  }
});

export default router;