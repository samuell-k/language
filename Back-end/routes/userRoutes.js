const express = require('express');
const router = express.Router();
const User = require('../Models/user');
router.use(express.json());

router.post('/login', async (req, res) => {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res
        .status(400)
        .json({ error: 'Please provide both email and password.' });
    }

    const user = await User.findOne({ Email });
    if (!user || Password !== user.Password) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: {
        Name: user.Name,
        Email: user.Email,
        User_Type: user.User_Type,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/teachers', async (req, res) => {
  try {
    const teachers = await User.find({ User_Type: 'teacher' });

    if (!teachers || teachers.length === 0) {
      return res.status(404).json({ error: 'No teachers found.' });
    }

    res.status(200).json({
      message: 'Teachers retrieved successfully.',
      teachers,
    });
  } catch (error) {
    console.error('Error retrieving teachers:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
