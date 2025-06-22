import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logsDir = path.join(__dirname, '../logs');

// Crear directorio de logs si no existe
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const logStream = fs.createWriteStream(
  path.join(logsDir, 'api-requests.log'), 
  { flags: 'a' }
);

export const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  
  const logData = {
    timestamp,
    method: req.method,
    endpoint: req.originalUrl,
    queryParams: req.query,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  };
  
  logStream.write(JSON.stringify(logData) + '\n');
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  
  next();
};

export const errorLogger = (err, req, res, next) => {
  const timestamp = new Date().toISOString();
  
  const errorLog = {
    timestamp,
    error: err.message,
    stack: err.stack,
    request: {
      method: req.method,
      url: req.originalUrl,
      params: req.params,
      query: req.query
    }
  };
  
  logStream.write(JSON.stringify(errorLog) + '\n');
  console.error(`[${timestamp}] ERROR: ${err.message}`);
  
  next(err);
};