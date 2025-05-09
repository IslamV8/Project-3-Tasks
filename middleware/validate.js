const Joi = require('joi');

exports.validateBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    // نجمع كل الرسائل مع بعض
    const messages = error.details.map(d => d.message);
    return res.status(400).json({ error: messages });
  }
  next();
};