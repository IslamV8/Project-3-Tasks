// api/index.js
const serverless = require('serverless-http');
const app        = require('../server');
const connectDB  = require('../lib/db');

// 1) افتَح اتصال المرة الوحيدة قبل أي invocation
connectDB().catch(err => console.error('DB Connection Error:', err));

// 2) صدّر الـ serverless handler اللي بيشغّل الـ Express app
module.exports = serverless(app);
