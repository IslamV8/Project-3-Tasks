const express = require('express');
const setupSwagger = require('./swagger');
const cors = require('cors');
const serverless = require('serverless-http'); // ✅ جديد
require('dotenv').config();

const authRoutes  = require('./routes/authRoutes');
const boardRoutes = require('./routes/boardRoutes');
const taskRoutes  = require('./routes/taskRoutes');

const app = express();

// Swagger setup
setupSwagger(app);

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/tasks', taskRoutes);


// ✅ Optional: تشغيل محلي
if (require.main === module) {
  const mongoose = require('mongoose');

  mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected!'))
  .catch(err => console.error('❌ DB Error:', err));
    
}

// ✅ تصدير كـ serverless handler
module.exports = serverless(app);