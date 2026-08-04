const mongoose = require('mongoose');

/**
 * Stores every successful Bangalore pincode search.
 * Spec fields: pincode, timestamp, totalResults.
 */
const searchHistorySchema = new mongoose.Schema(
  {
    pincode: {
      type: String,
      required: [true, 'Pincode is required'],
      trim: true,
      match: [/^\d{6}$/, 'Pincode must be exactly 6 digits'],
      index: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
    totalResults: {
      type: Number,
      required: [true, 'totalResults is required'],
      min: [0, 'totalResults cannot be negative'],
    },
  },
  {
    versionKey: false,
  }
);

// Compound-friendly listing: newest searches first for GET /api/history
searchHistorySchema.index({ timestamp: -1 });

const SearchHistory = mongoose.model('SearchHistory', searchHistorySchema);

module.exports = SearchHistory;
