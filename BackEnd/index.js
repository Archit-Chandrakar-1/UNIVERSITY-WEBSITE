import express from 'express';
import dotenv from 'dotenv'; 
import cors from 'cors';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload'; 

import { v2 as cloudinary } from 'cloudinary';

import departmentUserRoutes from './routes/authDepartment.js';
import programmeRoutes from './routes/programme.js';
import carouselRoutes from './routes/carousel.js';
import departmentContentRoutes from './routes/departmentContent.js';
import quickAccessRoutes from './routes/quickAccess.js'; 
import testimonialsRoutes from './routes/testimonials.js'
import studyMaterialRoutes from './routes/studyMaterialRoutes.js';
import facultyDirectoryRoutes from './routes/facultyDirectory.js'; 
import galleryRoutes from './routes/galleryRoutes.js'; 
import departmentSyllabusRoutes from './routes/departmentSyllabus.js';
import achievementsRoutes from './routes/departmentAchievmentRoutes.js'; 
import departmentOverviewRoutes from './routes/departmentOverviewRoutes.js';
import departmentTestimonialsRoutes from './routes/departmentTestimonialsRoutes.js';

// dotenv.config();
dotenv.config({ debug: true }); 

const app = express();
const PORT = process.env.PORT || 5555;


app.use(cors());
app.use(express.json()); 
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' })); 

// --- Cloudinary Configuration ---
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true 
});

// --- MongoDB Connection ---


mongoose.connect(process.env.MONGODB_URI, {}) 
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));


app.use('/api/auth/department', departmentUserRoutes);
app.use('/api/programmes', programmeRoutes);
app.use('/api/carousel', carouselRoutes);
// app.use('/api/departmentContent', departmentContentRoutes);
app.use('/api/department-content', departmentContentRoutes); 
app.use('/api/quick-access', quickAccessRoutes); 
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/studyMaterials', studyMaterialRoutes); 
app.use('/api/faculty', facultyDirectoryRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/syllabus', departmentSyllabusRoutes);
app.use('/api/achievementsCertification', achievementsRoutes);
app.use('/api/department-overview', departmentOverviewRoutes);
app.use('/api/department-testimonials', departmentTestimonialsRoutes); 


app.get('/', (_req, res) => {
  res.send('API is running...');
});

// --- Error Handling Middleware (optional but good practice) ---
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

console.log('--- .env Variables Check ---');
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Loaded' : 'Undefined');
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME ? 'Loaded' : 'Undefined');
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? 'Loaded' : 'Undefined');
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? 'Loaded' : 'Undefined');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Loaded' : 'Undefined');
console.log('----------------------------');