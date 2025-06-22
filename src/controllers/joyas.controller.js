import { getJoyas, getJoyasFiltradas } from '../models/joyas.model.js';

export const listarJoyas = async (req, res, next) => {
  try {
    const { limits, page, order_by } = req.validatedQuery;
    const { joyas, total, stockTotal } = await getJoyas({ limits, page, order_by });
    
    res.json({
      totalJoyas: total,
      stockTotal,
      results: joyas.map(joya => ({
        name: joya.nombre,
        href: `/joyas/joya/${joya.id}`
      }))
    });
  } catch (err) {
    next(err);
  }
};

export const filtrarJoyas = async (req, res, next) => {
  try {
    const joyas = await getJoyasFiltradas(req.validatedFilter);
    res.json(joyas.map(joya => ({
      id: joya.id,
      nombre: joya.nombre,
      categoria: joya.categoria,
      metal: joya.metal,
      precio: joya.precio,
      stock: joya.stock
    })));
  } catch (err) {
    next(err);
  }
};