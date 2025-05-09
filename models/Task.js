const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: String,
  description: String,

  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Completed', "Won't Do", 'Other'],
    default: 'To Do'
  },

  // إذا المستخدم اختار "Other"، يكتب الحالة هنا
  customStatus: {
    type: String,
    default: ''
  },

  icon: String,

  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board'
  }
});

module.exports = mongoose.model('Task', taskSchema);
