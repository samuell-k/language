const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');

router.use(express.json());

router.post('/payment', async (req, res) => {
  try {
    const { Payment_Method, Amount, Verification_Code, Student_ID, Event_ID } =
      req.body;

    if (!Payment_Method || !Amount || !Student_ID || !Event_ID) {
      return res
        .status(400)
        .json({ error: 'Please fill all the required fields.' });
    }

    if (Payment_Method === 'Card Payment' && !Verification_Code) {
      return res
        .status(400)
        .json({ error: 'Verification Code is required for Card Payment.' });
    }

    const newPayment = new Payment({
      Payment_Method,
      Amount,
      Payment_Status: 'Pending',
      Verification_Code,
      Student_ID,
      Event_ID,
    });

    const savedPayment = await newPayment.save();

    res
      .status(201)
      .json({ message: 'Payment created successfully', payment: savedPayment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/payments', async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('Student_ID', 'name email')
      .populate('Event_ID', 'name date');

    res.status(200).json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/payment/:id', async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('Student_ID', 'name email')
      .populate('Event_ID', 'name date');

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.status(200).json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/payment/:id', async (req, res) => {
  try {
    const {
      Payment_Method,
      Amount,
      Payment_Status,
      Verification_Code,
      Student_ID,
      Event_ID,
    } = req.body;

    if (Payment_Method === 'Card Payment' && !Verification_Code) {
      return res
        .status(400)
        .json({ error: 'Verification Code is required for Card Payment.' });
    }

    const updatedPayment = await Payment.findByIdAndUpdate(
      req.params.id,
      {
        Payment_Method,
        Amount,
        Payment_Status,
        Verification_Code,
        Student_ID,
        Event_ID,
      },
      { new: true, runValidators: true }
    );

    if (!updatedPayment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.status(200).json({
      message: 'Payment updated successfully',
      payment: updatedPayment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/payment/:id', async (req, res) => {
  try {
    const deletedPayment = await Payment.findByIdAndDelete(req.params.id);

    if (!deletedPayment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
