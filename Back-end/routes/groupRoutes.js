const express = require('express');
const router = express.Router();
const Group = require('../models/Group');

router.use(express.json());

router.post('/group', async (req, res) => {
  try {
    const { groupName, description } = req.body;

    if (!groupName || !description) {
      return res
        .status(400)
        .json({ error: 'Please fill all the required fields.' });
    }

    const newGroup = new Group({
      groupName,
      description,
    });

    const savedGroup = await newGroup.save();

    res
      .status(201)
      .json({ message: 'Group created successfully', group: savedGroup });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/groups', async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).json(groups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/group/:id', async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }
    res.status(200).json(group);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/group/:id', async (req, res) => {
  try {
    const { groupName, description } = req.body;

    const updatedGroup = await Group.findByIdAndUpdate(
      req.params.id,
      {
        groupName,
        description,
      },
      { new: true }
    );

    if (!updatedGroup) {
      return res.status(404).json({ error: 'Group not found' });
    }

    res
      .status(200)
      .json({ message: 'Group updated successfully', group: updatedGroup });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/group/:id', async (req, res) => {
  try {
    const deletedGroup = await Group.findByIdAndDelete(req.params.id);

    if (!deletedGroup) {
      return res.status(404).json({ error: 'Group not found' });
    }

    res.status(200).json({ message: 'Group deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
