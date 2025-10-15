// backend/models/DepartmentUser.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // For password hashing

const DepartmentUserSchema = new mongoose.Schema({
  departmentName: {
    type: String,
    required: [true, 'Please enter the department name'],
    unique: true, // Department names should be unique
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: 6,
  },
}, { timestamps: true });

// Hash password before saving
DepartmentUserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with hashed password
DepartmentUserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


const DepartmentUser = mongoose.models.DepartmentUser || mongoose.model('DepartmentUser', DepartmentUserSchema);

export default DepartmentUser;