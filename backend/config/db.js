const mongoose = require('mongoose');

/**
 * Connects to MongoDB Atlas using MONGODB_URI from environment variables.
 * Kept in config/ so server.js stays focused on HTTP setup.
 */
const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not defined. Copy .env.example to .env and set your Atlas connection string.');
  }

  const conn = await mongoose.connect(uri);

  console.log(`MongoDB connected: ${conn.connection.host}`);
};

module.exports = connectDB;
