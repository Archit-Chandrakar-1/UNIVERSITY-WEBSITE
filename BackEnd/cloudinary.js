// cloudinary.js
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.doeqcatpo,
  api_key: process.env['941453469224293'],
  api_secret: process.env['6LLNAN6JbGwXRb3TpneZ9aYzCuM']
});

export default cloudinary;