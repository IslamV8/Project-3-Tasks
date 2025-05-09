const Joi = require('joi');

// 1) Board schema
exports.boardSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  description: Joi.string().allow('').max(500),
});

// 2) Task schema
exports.taskSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  description: Joi.string().allow('').max(500),
  status: Joi.string().valid('To Do','In Progress','Completed',"Won't Do",'Other').required(),
  customStatus: Joi.when('status',{
    is: 'Other',
    then: Joi.string().min(1).max(100).required(),
    otherwise: Joi.string().allow('').max(100)
  }),
  icon: Joi.string().min(1).max(50).required()
});