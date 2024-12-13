const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    User_ID: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    Name: {
      type: String,
      required: true,
      trim: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
    },
    Username: {
      type: String,
      trim: true,
    },
    Phone_Number: {
      type: String,
      default: '0',
      trim: true,
    },
    Gender: {
      type: String,
      enum: ['male', 'female', 'Other'],
    },
    Password: {
      type: String,
      required: true,
    },
    User_Type: {
      type: String,
      enum: ['admin', 'teacher', 'student'],
      default: 'student',
      required: true,
    },
    Approval_Status: {
      type: String,
      enum: ['Approved', 'Rejected'],
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
