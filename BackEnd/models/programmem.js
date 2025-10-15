// backend/models/programmem.js // <--- UPDATED FILENAME

import mongoose from 'mongoose';

const ProgrammeSchema = new mongoose.Schema({
  department: { // Which department offers this program
    type: String,
    required: true,
    trim: true,
  },
  name: { // Name of the Program Offered (e.g., "Bachelor of Business Administration (BBA)")
    type: String,
    required: true,
    trim: true,
  },
  duration: { // E.g., "3/4 Years", "2 Years"
    type: String,
    required: true,
    trim: true,
  },
  level: { // E.g., "UG", "PG", "Ph.D."
    type: String,
    required: true,
    trim: true,
  },
  entry_qualification: { // E.g., "10+2 in any discipline", "Graduation in Commerce"
    type: String,
    required: true,
    trim: true,
  },
  fees_semester: { // E.g., "43,000", "27,500" - Storing as string to handle commas/currency symbols easily
    type: String,
    required: true,
    trim: true,
  },
  order: { // Optional: for custom sorting of programmes within a department
    type: Number,
    default: 0,
  }
}, { timestamps: true });

export default mongoose.model('Programme', ProgrammeSchema);