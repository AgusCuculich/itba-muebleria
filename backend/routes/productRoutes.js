import express from 'express';
import { ProductModel } from '../models/productModel.js';

const router = express.Router();

// GET / - Listado completo de productos
router.get('/', async (req, res, next) => {
  try {
    const data = await ProductModel.find({});

    res.status(200).json({
      success: true,
      data: data
    });

  } catch (error) {
    console.error('Error al obtener productos:', error.message);
    next(error); // Pasa el error al middleware de errores
  }
});

// GET /:slug - Producto por slug
router.get('/:slug', async (req, res, next) => {
  try {
    const { slug } = req.params;

    const product = await ProductModel.findOne({ slug });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado"
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });

  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const nuevoProducto = new ProductModel(req.body);
    const productoGuardado = await nuevoProducto.save();

    res.status(201).json({
      mensaje: 'Producto creado con éxito',
      producto: productoGuardado
    });

  } catch (error) {
    // Si ocurre un error (ej. validación fallida, email duplicado), lo pasamos al middleware de errores
    console.error('Error al crear producto:', error.message);
    error.status = 400; // Generalmente, un error de validación es un Bad Request (400)
    next(error);
  }
});

export default router;
