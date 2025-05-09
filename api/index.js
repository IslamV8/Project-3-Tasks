const serverless = require('serverless-http');
const app        = require('../server');  // يشير لـ server.js
const mongoose   = require('mongoose');

mongoose.connect(process.env.MONGO_URI).catch(console.error);

module.exports = serverless(app);