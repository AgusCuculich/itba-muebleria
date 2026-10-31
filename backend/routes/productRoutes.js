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

// PUT /:id - Modificar un producto existente por su ID
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validar si el ID recibido tiene formato válido para MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID no válido'
      });
    }

    // Buscar y actualizar en MongoDB Atlas (devuelve el documento actualizado y ejecuta validaciones de esquema)
    const productoActualizado = await ProductModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    // Contemplar caso en que el producto no exista en la base de datos
    if (!productoActualizado) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Producto actualizado con éxito',
      data: productoActualizado
    });

  } catch (error) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe un producto con ese valor único (slug o nombre)'
      });
    }
    console.error('Error al actualizar producto:', error.message);
    next(error);
  }
});

// DELETE /:id - Eliminar un producto existente por su ID
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validar si el ID recibido tiene formato válido para MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID no válido'
      });
    }

    // Buscar y eliminar de MongoDB Atlas
    const productoEliminado = await ProductModel.findByIdAndDelete(id);

    // Contemplar caso en que el producto no exista en la base de datos
    if (!productoEliminado) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Producto eliminado con éxito',
      data: productoEliminado
    });

  } catch (error) {
    console.error('Error al eliminar producto:', error.message);
    next(error);
  }
});

export default router;