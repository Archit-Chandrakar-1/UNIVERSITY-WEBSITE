import mongoose from 'mongoose';

const quickAccessItemSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['timetable', 'notification', 'brochure'],
    required: true,
  },
  
  name: {
    type: String,
    required: function() { return this.type !== 'notification'; }
  },
  url: {
    type: String,
    required: function() { return this.type !== 'notification'; }
  },
  
  message: {
    type: String,
    required: function() { return this.type === 'notification'; }
  },
  link: {
    type: String,
    required: false,
  }
});

const quickAccessSectionSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    unique: true,
  },
  items: [quickAccessItemSchema],
});

export default mongoose.model('QuickAccess', quickAccessSectionSchema);