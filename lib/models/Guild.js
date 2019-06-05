const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  game: {
    type: String,
    required: true
  },
  members: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Guild', guildSchema);
