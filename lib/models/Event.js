const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time :{
    type: String,
    required: true
  },
  guild: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Guild'
  }
});

module.exports = mongoose.model('Event', eventSchema);
