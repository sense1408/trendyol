const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const analyticsSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  analyticType: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  startTime: {
    type: String,
    required: false
  },
  createdAt: {
    type: Number,
    required: true
  }
}, {
  timestamps: false
});

const Analytics = mongoose.model('analytic', analyticsSchema);

module.exports = Analytics;

