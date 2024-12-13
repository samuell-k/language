const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.use(express.json());

router.post('/event', async (req, res) => {
  try {
    const { Level, Topic, Start_Time, End_Time } = req.body;

    if (!Level || !Topic || !Start_Time || !End_Time) {
      return res
        .status(400)
        .json({ error: 'Please fill all the required fields.' });
    }

    const newEvent = new Event({
      Level,
      Topic,
      Start_Time,
      End_Time,
    });

    const savedEvent = await newEvent.save();

    res
      .status(201)
      .json({ message: 'Event created successfully', event: savedEvent });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/event/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/event/:id', async (req, res) => {
  try {
    const { Level, Topic, Start_Time, End_Time } = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { Level, Topic, Start_Time, End_Time },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res
      .status(200)
      .json({ message: 'Event updated successfully', event: updatedEvent });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/event/:id', async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
