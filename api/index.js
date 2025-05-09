// api/index.js
const serverless = require('serverless-http');
const app        = require('../server');
const connectDB  = require('../lib/db');

module.exports = serverless(async (req, res) => {
  try {
    await connectDB();
    // لو عايز تعرف إيه اسم الـ DB أو حالة الاتصال:
    res.status(200).json({ message: '✅ MongoDB connected!' });
  } catch (err) {
    console.error('DB Connection Error:', err);
    res.status(500).json({ error: 'MongoDB connection failed', details: err.message });
  }
});
module.exports = serverless(app);
