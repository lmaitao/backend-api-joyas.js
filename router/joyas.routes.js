import express from 'express';
import { listarJoyas, filtrarJoyas } from '../src/controllers/joyas.controller.js';
import { validateJoyasQuery, validateJoyasFilter } from '../middlewares/validate.middleware.js';
import { requestLogger } from '../middlewares/logger.middleware.js';

const router = express.Router();

router.get('/joyas', 
  requestLogger,
  validateJoyasQuery, 
  listarJoyas
);

router.get('/joyas/filtros', 
  requestLogger,
  validateJoyasFilter, 
  filtrarJoyas
);

export default router;