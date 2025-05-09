// api/index.js
const serverless = require('serverless-http');
const app        = require('../server');
const connectDB  = require('../lib/db');

// نتأكد من فتح اتصال واحد بالـ MongoDB قبل أي invocation
connectDB().catch(err => {
  console.error('DB Connection Error:', err);
  // لو فشل الاتصال هيسقط invocation ب500
});

module.exports = serverless(app);
