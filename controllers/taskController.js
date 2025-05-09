// controllers/taskController.js
const Task  = require('../models/Task');
const Board = require('../models/Board');

// جلب المهام مع فلترة حسب الحالة أو بحث نصي
exports.getTasks = async (req, res) => {
  try {
    const { status, search } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (search) filter.$or = [
      { name:        new RegExp(search, 'i') },
      { description: new RegExp(search, 'i') }
    ];

    // لو عايزين نتأكد إن المهام تخص بوردات المستخدم
    if (req.user) {
      // نجلب كل بوردات المستخدم
      const boards = await Board.find({ user: req.user.userId }).select('_id');
      const boardIds = boards.map(b => b._id);
      filter.board = { $in: boardIds };
    }

    const tasks = await Task.find(filter).exec();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// إنشاء مهمة جديدة باسم افتراضي وربطها ببورد
exports.createTask = async (req, res) => {
  try {
    const { boardId } = req.body;
    // نتأكد إن البورد موجود وبيخص المستخدم
    const board = await Board.findOne({ _id: boardId, user: req.user.userId });
    if (!board) return res.status(404).json({ error: 'Board not found or unauthorized' });

    // خلق مهمة
    const task = await Task.create({
      name: 'New Task',
      description: '',
      status: 'To Do',
      icon: '📋',
      board: board._id
    });

    // إضافة ID المهمة لمصفوفة البورد
    board.tasks.push(task._id);
    await board.save();

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// تعديل بيانات المهمة
exports.updateTask = async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// حذف المهمة
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};