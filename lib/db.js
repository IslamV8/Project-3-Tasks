// lib/db.js
const mongoose = require('mongoose');

let cached = global._mongo;  // Node global cache

if (!cached) {
  cached = global._mongo = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URI, {
        // خيارات ممكن تحسن الأداء
        bufferCommands: false,
        // useNewUrlParser/useUnifiedTopology deprecated in mongoose v6
      })
      .then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = connectDB;
