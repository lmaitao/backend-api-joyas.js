export const handleNotFound = (req, res) => {
  res.status(404).json({ error: 'Endpoint no encontrado' });
};

export const handleErrors = (err, req, res, next) => {
  res.status(500).json({ error: 'Error interno del servidor' });
};