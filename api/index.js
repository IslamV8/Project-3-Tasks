const serverless = require('serverless-http');
const app        = require('../server');
const connectDB  = require('../lib/db');

// افتح اتصال مرّة واحدة (cold start)
connectDB().catch(err => console.error('DB Connection Error:', err));

app.get("/", (req, res) => {
    res.json("hi")
});

module.exports = serverless(app);