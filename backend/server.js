import express from 'express';
import path from 'path';
import cors from 'cors';
import logger from './middleware/logger.js';
import productRoutes from './routes/productRoutes.js';
import { connectToMongoDB, disconnectFromMongoDB } from './config/db.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// 1. Archivos estáticos (imágenes de los productos)
app.use(express.static(path.join(import.meta.dirname, 'public')));

// 2. Parser JSON
app.use(express.json());

// 3. Middleware de logging global
app.use(logger);

// 4. Rutas de productos
app.use('/api/productos', productRoutes);

// 5. Manejador de estado 404 para rutas no definidas
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Ruta no encontrada"
  });
});

// 6. Manejador de errores centralizado (500 Internal Server Error)
// Asegurando no exponer el stack trace al cliente
app.use((err, req, res, next) => {
  console.error(err); // Log interno
  res.status(500).json({
    success: false,
    message: "Error interno del servidor"
  });
});

// Iniciar conexión y luego servidor
async function startServer() {
  await connectToMongoDB();

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

startServer();

// Cierre graceful al presionar Ctrl+C o apagar proceso
process.on('SIGINT', async () => {
  await disconnectFromMongoDB();
  process.exit(0);
});
process.on('SIGTERM', async () => {
  await disconnectFromMongoDB();
  process.exit(0);
});
