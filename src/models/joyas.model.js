import pool from '../../db/database.js';

export const getJoyas = async ({ limits = 10, page = 1, order_by = 'id_ASC' }) => {
  const limit = parseInt(limits, 10);
  const offset = (page - 1) * limit;
  const [field, direction] = order_by.split('_');
  
  const { rows: joyas } = await pool.query(
    `SELECT id, nombre FROM inventario ORDER BY ${field} ${direction} LIMIT $1 OFFSET $2`,
    [limit, offset]
  );
  
  const { rows: [{ count }] } = await pool.query('SELECT COUNT(*) FROM inventario');
  const { rows: [{ sum }] } = await pool.query('SELECT SUM(stock) FROM inventario');
  
  return {
    joyas,
    total: parseInt(count, 10),
    stockTotal: parseInt(sum, 10)
  };
};

export const getJoyasFiltradas = async ({ precio_min, precio_max, categoria, metal }) => {
  let queryText = 'SELECT * FROM inventario WHERE 1=1';
  const values = [];
  let counter = 1;
  
  if (precio_min) {
    queryText += ` AND precio >= $${counter++}`;
    values.push(parseInt(precio_min));
  }
  
  if (precio_max) {
    queryText += ` AND precio <= $${counter++}`;
    values.push(parseInt(precio_max));
  }
  
  if (categoria) {
    queryText += ` AND categoria = $${counter++}`;
    values.push(categoria);
  }
  
  if (metal) {
    queryText += ` AND metal = $${counter++}`;
    values.push(metal);
  }
  
  const { rows } = await pool.query(queryText, values);
  return rows;
};