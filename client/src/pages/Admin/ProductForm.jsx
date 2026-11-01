import { useState } from 'react';
import { useNavigate } from 'react-router';
import { createProduct } from '../../services/api';
import './ProductForm.css';

const IMAGENES_DISPONIBLES = [
  { label: 'Sillón Copacabana', value: 'sillon-copacabana.png' },
  { label: 'Sofá Patagonia', value: 'sofa-patagonia.png' },
  { label: 'Butaca Mendoza', value: 'butaca-mendoza.png' },
  { label: 'Sillas Córdoba', value: 'sillas-cordoba.png' },
  { label: 'Silla Belgrano', value: 'silla-de-trabajo-belgrano.png' },
  { label: 'Aparador Uspallata', value: 'aparador-uspallata.png' },
  { label: 'Biblioteca Recoleta', value: 'biblioteca-recoleta.png' },
  { label: 'Escritorio Costa', value: 'escritorio-costa.png' },
  { label: 'Mesa Comedor Pampa', value: 'mesa-comedor-pampa.png' },
  { label: 'Mesa de Centro Araucaria', value: 'mesa-de-centro-araucaria.png' },
  { label: 'Mesa de Noche Aconcagua', value: 'mesa-de-noche-aconcagua.png' },
];

const IMAGE_BASE_URL = 'http://localhost:3000/images/';

export const ProductForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    imagen: IMAGENES_DISPONIBLES[0].value,
  });

  const [modoImagenManual, setModoImagenManual] = useState(false);
  const [errores, setErrores] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [estadoEnvio, setEstadoEnvio] = useState({ tipo: '', mensaje: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validar = () => {
    const nuevosErrores = {};

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre del producto es obligatorio.';
    }

    if (!formData.precio || Number(formData.precio) <= 0) {
      nuevosErrores.precio = 'El precio debe ser un número mayor a 0.';
    }

    if (formData.stock !== '' && Number(formData.stock) < 0) {
      nuevosErrores.stock = 'El stock no puede ser negativo.';
    }

    if (!formData.imagen.trim()) {
      nuevosErrores.imagen = 'Debes indicar un nombre de archivo de imagen.';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstadoEnvio({ tipo: '', mensaje: '' });

    if (!validar()) {
      setEstadoEnvio({
        tipo: 'error',
        mensaje: 'Por favor, revisá los campos con error.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        nombre: formData.nombre.trim(),
        descripcion: formData.descripcion.trim(),
        precio: Number(formData.precio),
        stock: formData.stock === '' ? 0 : Number(formData.stock),
        imagen: formData.imagen.trim(),
      };

      const resultado = await createProduct(payload);

      setEstadoEnvio({
        tipo: 'exito',
        mensaje: `${resultado.mensaje || '¡Producto creado exitosamente!'} Redirigiendo...`,
      });

      const slugDestino = resultado.producto?.slug;
      setTimeout(() => {
        if (slugDestino) {
          navigate(`/productos/${slugDestino}`);
        } else {
          navigate('/productos');
        }
      }, 1500);
    } catch (error) {
      setEstadoEnvio({
        tipo: 'error',
        mensaje: error.message || 'Error al guardar el producto en el servidor.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const urlVistaPrevia = formData.imagen
    ? `${IMAGE_BASE_URL}${formData.imagen}`
    : '';

  return (
    <main>
      <section className="admin-formulario-seccion">
        <div className="admin-formulario-encabezado">
          <h1>Panel Administrador</h1>
          <p>Carga de nuevos productos al catálogo</p>
        </div>

        <div className="admin-formulario-tarjeta">
          {estadoEnvio.mensaje && (
            <div
              role="alert"
              aria-live="polite"
              className={`alerta-formulario ${
                estadoEnvio.tipo === 'exito' ? 'alerta-exito' : 'alerta-error'
              }`}
            >
              {estadoEnvio.mensaje}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="formulario-producto">
            {/* Nombre */}
            <div className="campo-grupo">
              <label htmlFor="nombre" className="campo-etiqueta">
                Nombre del producto *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej: Mesa de Roble Escandinava"
                required
                aria-invalid={!!errores.nombre}
                className={`campo-input ${errores.nombre ? 'campo-input--error' : ''}`}
              />
              {errores.nombre && (
                <span role="alert" className="campo-error">
                  {errores.nombre}
                </span>
              )}
            </div>

            {/* Descripción */}
            <div className="campo-grupo">
              <label htmlFor="descripcion" className="campo-etiqueta">
                Descripción
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows="3"
                placeholder="Detalles sobre materiales, origen y diseño..."
                className="campo-textarea"
              />
            </div>

            {/* Precio y Stock */}
            <div className="campos-fila">
              <div className="campo-grupo">
                <label htmlFor="precio" className="campo-etiqueta">
                  Precio (ARS) *
                </label>
                <input
                  type="number"
                  id="precio"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  placeholder="Ej: 150000"
                  min="1"
                  step="any"
                  required
                  aria-invalid={!!errores.precio}
                  className={`campo-input ${errores.precio ? 'campo-input--error' : ''}`}
                />
                {errores.precio && (
                  <span role="alert" className="campo-error">
                    {errores.precio}
                  </span>
                )}
              </div>

              <div className="campo-grupo">
                <label htmlFor="stock" className="campo-etiqueta">
                  Stock disponible
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Ej: 5"
                  min="0"
                  step="1"
                  aria-invalid={!!errores.stock}
                  className={`campo-input ${errores.stock ? 'campo-input--error' : ''}`}
                />
                {errores.stock && (
                  <span role="alert" className="campo-error">
                    {errores.stock}
                  </span>
                )}
              </div>
            </div>

            {/* Imagen del producto */}
            <div className="bloque-imagen">
              <div className="bloque-imagen-header">
                <label htmlFor="imagen" className="campo-etiqueta">
                  Imagen del producto (almacenada en public/images/) *
                </label>
                <button
                  type="button"
                  onClick={() => setModoImagenManual((prev) => !prev)}
                  className="boton-modo-imagen"
                >
                  {modoImagenManual ? 'Elegir de lista existente' : 'Ingresar nombre manual'}
                </button>
              </div>

              {modoImagenManual ? (
                <input
                  type="text"
                  id="imagen"
                  name="imagen"
                  value={formData.imagen}
                  onChange={handleChange}
                  placeholder="ejemplo-foto.png"
                  required
                  className={`campo-input ${errores.imagen ? 'campo-input--error' : ''}`}
                />
              ) : (
                <select
                  id="imagen"
                  name="imagen"
                  value={formData.imagen}
                  onChange={handleChange}
                  className="campo-select"
                >
                  {IMAGENES_DISPONIBLES.map((img) => (
                    <option key={img.value} value={img.value}>
                      {img.label} ({img.value})
                    </option>
                  ))}
                </select>
              )}

              {errores.imagen && (
                <span role="alert" className="campo-error">
                  {errores.imagen}
                </span>
              )}

              {/* Vista previa de la imagen */}
              <div className="vista-previa-contenedor">
                <div className="vista-previa-marco">
                  {formData.imagen ? (
                    <img
                      src={urlVistaPrevia}
                      alt="Vista previa"
                      className="vista-previa-img"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <span className="vista-previa-sin-img">Sin imagen</span>
                  )}
                </div>
                <div className="vista-previa-info">
                  <span className="vista-previa-nombre">Nombre guardado en DB:</span>
                  <code className="vista-previa-codigo">
                    {formData.imagen || 'ninguno'}
                  </code>
                  <span>
                    URL resuelta:{' '}
                    <span className="vista-previa-url">{urlVistaPrevia || '-'}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="acciones-formulario">
              <button
                type="button"
                onClick={() => navigate('/productos')}
                className="btn-volver"
              >
                Volver al catálogo
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-publicar"
              >
                {isSubmitting ? 'Guardando producto...' : 'Publicar Producto'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};