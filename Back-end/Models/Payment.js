const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    Payment_ID: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    Payment_Method: {
      type: String,
      enum: ['Mobile Payment', 'Card Payment'],
      required: [true, 'Payment method is required'],
    },
    Amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0, 'Amount cannot be negative'],
    },
    Payment_Status: {
      type: String,
      enum: ['Pending', 'Complete'],
      default: 'Pending',
    },
    Verification_Code: {
      type: String,
      unique: true,
      sparse: true,
    },
    Student_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
    },
    Event_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
    },
  },
  { timestamps: true }
);

paymentSchema.pre('save', function (next) {
  if (this.Payment_Method === 'Card Payment' && !this.Verification_Code) {
    return next(new Error('Verification code is required for card payments.'));
  }
  next();
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
