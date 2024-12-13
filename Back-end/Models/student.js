const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    Student_ID: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    Name: {
      type: String,
      required: true,
      trim: true,
    },
    Phone_Number: {
      type: String,
      required: true,
      match: [/^\d{10,10}$/, 'Please enter a valid phone number'],
    },
    Gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
    },
    Username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    Password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
