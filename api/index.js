const serverless = require('serverless-http');
const app        = require('../server');
const connectDB  = require('../lib/db');

connectDB().catch(err => console.error('DB Connection Error:', err));

app.get('/', (req, res) => {
  res.json({ message: 'API is alive!' });
});

module.exports = serverless(app);
