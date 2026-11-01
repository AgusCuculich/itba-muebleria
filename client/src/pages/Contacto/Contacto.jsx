import { useState } from 'react';
import { useNavigate } from 'react-router';

export const Contacto = () => {
  const navigate = useNavigate();
  // Estado para el formulario controlado
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });

  // Estado para los errores de validación
  const [errores, setErrores] = useState({});
  
  // Estado para la respuesta asíncrona global
  const [estadoEnvio, setEstadoEnvio] = useState({ tipo: '', mensaje: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Limpiamos el error específico al comenzar a escribir
    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'Por favor, ingresá tu nombre.';
    }
    
    if (!formData.email.trim()) {
      nuevosErrores.email = 'Por favor, ingresá tu correo electrónico.';
    } else if (!emailRegex.test(formData.email)) {
      nuevosErrores.email = 'Ingresá un correo electrónico válido (ej: nombre@correo.com).';
    }
    
    if (!formData.mensaje.trim()) {
      nuevosErrores.mensaje = 'Por favor, escribí tu mensaje.';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstadoEnvio({ tipo: '', mensaje: '' });

    if (!validarFormulario()) {
      setEstadoEnvio({
        tipo: 'error',
        mensaje: 'Por favor, completá correctamente los campos antes de enviar.',
      });
      return;
    }

    try {
      // Simulación de envío al backend (preparado para ser reemplazado por la convención de api.js)
      await new Promise((resolve) => setTimeout(resolve, 800));

      setEstadoEnvio({
        tipo: 'exito',
        mensaje: `¡Gracias por contactarte, ${formData.nombre}! Recibimos tu consulta en el taller y te responderemos a la brevedad a ${formData.email}.`,
      });
      
      // Limpiamos el formulario
      setFormData({ nombre: '', email: '', mensaje: '' });
      setTimeout(() => {
        navigate('/');
      }, 3000);

    } catch (error) {
      setEstadoEnvio({
        tipo: 'error',
        mensaje: 'Tuvimos un inconveniente al enviar tu mensaje. Por favor, intentá nuevamente.',
      });
    }
  };

  return (
    <main className="min-h-screen bg-alabastro text-carbon py-secciones px-interno flex flex-col items-center">
      <section className="w-full max-w-2xl mt-12">
        <div className="text-center mb-10">
          <h1 className="font-serif text-siena text-4xl md:text-5xl mb-4 uppercase tracking-widest">
            Contacto con el Taller
          </h1>
          <p className="font-sans text-carbon/80 text-lg">
            Envianos tus comentarios o preguntas y nos pondremos en contacto con vos.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 md:p-10 border border-carbon/5">
          <h2 className="font-serif text-siena text-2xl mb-2 uppercase tracking-widest">Contáctanos</h2>
          <p className="font-sans text-carbon/80 mb-8">
            Escribinos y coordinemos una visita a la Casa Taller o consultanos por piezas a medida.
          </p>

          {estadoEnvio.mensaje && (
            <div
              role="alert"
              aria-live="polite"
              className={`p-4 mb-6 rounded-lg font-sans border ${
                estadoEnvio.tipo === 'exito'
                  ? 'bg-salvia/20 border-salvia/40 text-carbon'
                  : 'bg-rosa-polvoriento/20 border-rosa-polvoriento/40 text-carbon'
              }`}
            >
              {estadoEnvio.mensaje}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6 font-sans">
            <div className="flex flex-col gap-2">
              <label htmlFor="nombre" className="font-medium text-carbon">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                autoComplete="name"
                placeholder="Tu nombre"
                required
                aria-invalid={!!errores.nombre}
                className={`w-full p-3 rounded-lg bg-transparent border focus:outline-none focus-visible:ring-2 focus-visible:ring-siena transition-shadow ${
                  errores.nombre ? 'border-rosa-polvoriento ring-1 ring-rosa-polvoriento' : 'border-carbon/30'
                }`}
              />
              {errores.nombre && (
                <span id="error-nombre" role="alert" aria-live="polite" className="block w-full mt-1 p-2 text-sm text-carbon font-medium bg-rosa-polvoriento/20 border border-rosa-polvoriento/50 rounded">
                  {errores.nombre}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-medium text-carbon">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                placeholder="tu@correo.com"
                required
                aria-invalid={!!errores.email}
                className={`w-full p-3 rounded-lg bg-transparent border focus:outline-none focus-visible:ring-2 focus-visible:ring-siena transition-shadow ${
                  errores.email ? 'border-rosa-polvoriento ring-1 ring-rosa-polvoriento' : 'border-carbon/30'
                }`}
              />
              {errores.email && (
                <span id="error-email" role="alert" aria-live="polite" className="block w-full mt-1 p-2 text-sm text-carbon font-medium bg-rosa-polvoriento/20 border border-rosa-polvoriento/50 rounded">
                  {errores.email}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="mensaje" className="font-medium text-carbon">
                Mensaje *
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                rows="4"
                placeholder="Escribí aquí tu consulta o comentario..."
                required
                aria-invalid={!!errores.mensaje}
                className={`w-full p-3 rounded-lg bg-transparent border focus:outline-none focus-visible:ring-2 focus-visible:ring-siena transition-shadow resize-y ${
                  errores.mensaje ? 'border-rosa-polvoriento ring-1 ring-rosa-polvoriento' : 'border-carbon/30'
                }`}
              ></textarea>
              {errores.mensaje && (
                <span id="error-mensaje" role="alert" aria-live="polite" className="block w-full mt-1 p-2 text-sm text-carbon font-medium bg-rosa-polvoriento/20 border border-rosa-polvoriento/50 rounded">
                  {errores.mensaje}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="mt-2 w-full bg-siena text-alabastro font-medium py-3 px-6 rounded-lg border border-siena hover:bg-transparent hover:text-siena focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-siena transition-colors"
            >
              Enviar
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}