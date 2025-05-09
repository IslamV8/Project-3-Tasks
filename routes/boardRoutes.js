const express = require('express');
const router  = express.Router();

const auth            = require('../middleware/authMiddleware');
const { validateBody } = require('../middleware/validate');
const { boardSchema }  = require('../validation/schemas');
const {
  createBoard,
  getUserBoards,
  getBoard,
  updateBoard,
  deleteBoard
} = require('../controllers/boardController');

/**
 * @swagger
 * tags:
 *   - name: Boards
 *     description: إدارة الـ Boards
 */

/**
 * @swagger
 * /api/boards:
 *   get:
 *     tags: [Boards]
 *     summary: جلب كل البوردات الخاصة بالمستخدم
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: رقم الصفحة
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: عدد البوردات في كل صفحة
 *     responses:
 *       200:
 *         description: القائمة المصفحة للبوردات
 */

/**
 * @swagger
 * /api/boards:
 *   post:
 *     tags: [Boards]
 *     summary: إنشاء بورد جديد
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Board'
 *     responses:
 *       201:
 *         description: تم الإنشاء بنجاح
 */

/**
 * @swagger
 * /api/boards/{id}:
 *   get:
 *     tags: [Boards]
 *     summary: جلب بورد واحد
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: معرف البورد
 *     responses:
 *       200:
 *         description: تفاصيل البورد
 */

/**
 * @swagger
 * /api/boards/{id}:
 *   put:
 *     tags: [Boards]
 *     summary: تعديل بيانات البورد
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: معرف البورد
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Board'
 *     responses:
 *       200:
 *         description: تم التعديل بنجاح
 */

/**
 * @swagger
 * /api/boards/{id}:
 *   delete:
 *     tags: [Boards]
 *     summary: حذف بورد
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: معرف البورد
 *     responses:
 *       200:
 *         description: تم الحذف بنجاح
 */

router.get('/',    auth, validateBody(boardSchema), getUserBoards);
router.post('/',   auth, validateBody(boardSchema), createBoard);
router.get('/:id', auth,                     getBoard);
router.put('/:id', auth, validateBody(boardSchema), updateBoard);
router.delete('/:id', auth,                  deleteBoard);

module.exports = router;