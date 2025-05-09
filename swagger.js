const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// 1) إعدادات عامة
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Board API',
      version: '1.0.0',
      description: 'API لتطبيق إدارة المهام مع JWT و MongoDB'
    },
    servers: [
      { url: 'http://localhost:5000' }
    ]
  },
  // 2) مسار كل الملفات اللي فيها التعليقات (JSDoc) عن الراوتس
  apis: ['./routes/*.js'] 
};

// 3) توليد الوثائق
const swaggerSpec = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
