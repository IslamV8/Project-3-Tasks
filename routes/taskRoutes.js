// routes/taskRoutes.js
const express = require('express');
const router  = express.Router();                    // أولًا Router

// ➕ استيراد الميدل وير والـ schema
const auth         = require('../middleware/authMiddleware');
const { validateBody } = require('../middleware/validate');
const { taskSchema }   = require('../validation/schemas');

// ➕ استيراد الكنترولر
const {
  getTasks,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

const { createTask } = require('../controllers/taskController');

// ➕ الراوتس
router.get('/',    auth, getTasks);
router.post('/',   auth, createTask);
router.put('/:id', auth, validateBody(taskSchema), updateTask);
router.delete('/:id', auth, deleteTask);

module.exports = router;
