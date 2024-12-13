// const express = require('express');
// const router = express.Router();
// const Teacher = require('../models/Teacher');

// // Middleware to parse JSON request body
// router.use(express.json());

// // Route to create a new teacher
// router.post('/teacher', async (req, res) => {
//   try {
//     const { Name, Email, Username, Password, Approval_Status } = req.body;

//     // Check if all required fields are provided
//     if (!Name || !Email || !Username || !Password) {
//       return res
//         .status(400)
//         .json({ error: 'Please fill all the required fields.' });
//     }

//     // Create a new teacher object
//     const newTeacher = new Teacher({
//       Name,
//       Email,
//       Username,
//       Password,
//       Approval_Status: Approval_Status || 'Rejected', // Default to 'Rejected' if not provided
//     });

//     // Save the new teacher to the database
//     const savedTeacher = await newTeacher.save();

//     res
//       .status(201)
//       .json({ message: 'Teacher created successfully', teacher: savedTeacher });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Route to get all teachers
// router.get('/teachers', async (req, res) => {
//   try {
//     const teachers = await Teacher.find();
//     res.status(200).json(teachers);
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Route to get a single teacher by ID
// router.get('/teacher/:id', async (req, res) => {
//   try {
//     const teacher = await Teacher.findById(req.params.id);
//     if (!teacher) {
//       return res.status(404).json({ error: 'Teacher not found' });
//     }
//     res.status(200).json(teacher);
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Route to update a teacher
// router.put('/teacher/:id', async (req, res) => {
//   try {
//     const { Name, Email, Username, Password, Approval_Status } = req.body;

//     const updatedTeacher = await Teacher.findByIdAndUpdate(
//       req.params.id,
//       { Name, Email, Username, Password, Approval_Status },
//       { new: true } // Return the updated document
//     );

//     if (!updatedTeacher) {
//       return res.status(404).json({ error: 'Teacher not found' });
//     }

//     res.status(200).json({
//       message: 'Teacher updated successfully',
//       teacher: updatedTeacher,
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Route to delete a teacher
// router.delete('/teacher/:id', async (req, res) => {
//   try {
//     const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);

//     if (!deletedTeacher) {
//       return res.status(404).json({ error: 'Teacher not found' });
//     }

//     res.status(200).json({ message: 'Teacher deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// module.exports = router;
