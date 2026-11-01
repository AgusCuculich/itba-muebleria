import express from 'express';
import mongoose from 'mongoose';
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

    // Evaluamos si el string tiene el formato de un ObjectId de Mongo
    const esObjectId = mongoose.Types.ObjectId.isValid(slug);
    
    // Armamos la consulta dinámicamente según el resultado anterior
    const query = esObjectId ? { _id: slug } : { slug: slug };

    const product = await ProductModel.findOne(query);

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

// POST / - Crear un nuevo producto
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

// PUT /:slug - Actualizar un producto por slug o _id
router.put('/:slug', async (req, res, next) => {
  try {
    const { slug } = req.params;
    const esObjectId = mongoose.Types.ObjectId.isValid(slug);
    const query = esObjectId ? { _id: slug } : { slug: slug };

    const productoActualizado = await ProductModel.findOneAndUpdate(
      query,
      req.body,
      { new: true, runValidators: true }
    );

    if (!productoActualizado) {
      return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    }

    res.status(200).json({ success: true, data: productoActualizado });
  } catch (error) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.status(400).json({ success: false, message: error.message });
    }
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Ya existe un producto con ese valor único' });
    }
    next(error);
  }
});

// DELETE /:slug - Eliminar un producto por slug o _id
router.delete('/:slug', async (req, res, next) => {
  try {
    const { slug } = req.params;
    const esObjectId = mongoose.Types.ObjectId.isValid(slug);
    const query = esObjectId ? { _id: slug } : { slug: slug };

    const productoEliminado = await ProductModel.findOneAndDelete(query);

    if (!productoEliminado) {
      return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    }

    res.status(200).json({ success: true, data: productoEliminado });
  } catch (error) {
    next(error);
  }
});
export default router;