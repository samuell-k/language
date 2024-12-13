const express = require('express');
const router = express.Router();
const User = require('../Models/user');
router.use(express.json());

router.post('/create-user', async (req, res) => {
  try {
    const { name, email, password, username, phone_number, gender, user_type } =
      req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: 'Please fill in all required fields.' });
    }

    const existingUser = await User.findOne({ Email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: 'User with this email already exists.' });
    }

    const newUser = new User({
      Name: name,
      Email: email,
      Username: username,
      Phone_Number: phone_number || '0',
      Gender: gender,
      Password: password,
      User_Type: user_type || 'student',
    });

    const savedUser = await newUser.save();

    res
      .status(201)
      .json({ message: 'User created successfully', user: savedUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
