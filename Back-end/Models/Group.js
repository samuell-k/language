const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: [true, 'Group Name is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
});

module.exports = mongoose.model('Group', groupSchema);
