const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

router.use(express.json());

router.post('/student', async (req, res) => {
  try {
    const { Name, Phone_Number, Gender, Email, Username, Password } = req.body;

    if (!Name || !Phone_Number || !Gender || !Email || !Username || !Password) {
      return res
        .status(400)
        .json({ error: 'Please fill all the required fields.' });
    }

    const newStudent = new Student({
      Name,
      Phone_Number,
      Gender,
      Email,
      Username,
      Password,
    });

    e;
    const savedStudent = await newStudent.save();

    res
      .status(201)
      .json({ message: 'Student created successfully', student: savedStudent });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/student/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/student/:id', async (req, res) => {
  try {
    const { Name, Phone_Number, Gender, Email, Username, Password } = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { Name, Phone_Number, Gender, Email, Username, Password },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json({
      message: 'Student updated successfully',
      student: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/student/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);

    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
