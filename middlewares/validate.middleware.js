import Joi from 'joi';

const joyasQuerySchema = Joi.object({
  limits: Joi.number().integer().min(1).default(10),
  page: Joi.number().integer().min(1).default(1),
  order_by: Joi.string()
    .pattern(/^(id|nombre|categoria|metal|precio|stock)_(ASC|DESC)$/)
    .default('id_ASC')
});

const joyasFilterSchema = Joi.object({
  precio_min: Joi.number().integer().min(0),
  precio_max: Joi.number().integer().min(0),
  categoria: Joi.string().valid('collar', 'aros', 'anillo'),
  metal: Joi.string().valid('oro', 'plata')
}).or('precio_min', 'precio_max', 'categoria', 'metal');

export const validateJoyasQuery = (req, res, next) => {
  const { error, value } = joyasQuerySchema.validate(req.query);
  
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  
  req.validatedQuery = value;
  next();
};

export const validateJoyasFilter = (req, res, next) => {
  const { error, value } = joyasFilterSchema.validate(req.query);
  
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  
  req.validatedFilter = value;
  next();
};