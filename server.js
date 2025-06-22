import express from 'express';
import joyasRoutes from './router/joyas.routes.js';
import { handleNotFound, handleErrors } from './src/controllers/error.controller.js';
import { errorLogger } from './middlewares/logger.middleware.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
  res.json({
    message: 'API de Joyas',
    endpoints: {
      listar: '/joyas?limits=10&page=1&order_by=id_ASC',
      filtrar: '/joyas/filtros?precio_min=10000&categoria=aros'
    }
  });
});

app.use('/', joyasRoutes);

// Manejo de errores
app.use(handleNotFound);
app.use(errorLogger);
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(` 🔥 Servidor corriendo en http://localhost:${PORT}`);
});