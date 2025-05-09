// server.js
const express    = require('express');
const setupSwagger = require('./swagger');
const mongoose   = require('mongoose');
const cors       = require('cors');
require('dotenv').config();

const authRoutes  = require('./routes/authRoutes');
const boardRoutes = require('./routes/boardRoutes');
const taskRoutes  = require('./routes/taskRoutes');

const app = express();
setupSwagger(app);
app.use(cors());
app.use(express.json());
app.use('/api/auth',  authRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/tasks',  taskRoutes);

// **دائماً استمع عالـ PORT للتطوير المحلي**
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to DB');
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch(err => console.error(err));

module.exports = app;  
