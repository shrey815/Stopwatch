const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: 0
  },
  laps: [{
    lapNumber: {
      type: Number,
      required: true
    },
    splitTime: {
      type: Number,
      required: true
    },
    totalTime: {
      type: Number,
      required: true
    }
  }],
  date: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
sessionSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Session', sessionSchema);
