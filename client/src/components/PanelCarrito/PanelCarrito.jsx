import './PanelCarrito.css'

const IMAGE_URL = "http://localhost:3000/images/";

// Formato de moneda consistente con la vista de detalle
const formatearPrecio = (valor) => `$ ${(valor || 0).toLocaleString('es-AR')}`

// Panel lateral (drawer) con los productos del carrito.
// Es un componente de presentación: recibe todo por props y no guarda estado propio.
export const PanelCarrito = ({ abierto, onCerrar, carrito, onModificarCantidad, onEliminar }) => {
  // Total a pagar, calculado en cada render a partir del carrito
  const totalPrecio = carrito.reduce((acc, item) => acc + (item.precio || 0) * (item.cantidad || 0), 0)

  return (
    <>
      {/* Fondo oscuro detrás del panel: al hacer click, lo cierra */}
      <div
        className={`overlay-carrito ${abierto ? 'abierto' : ''}`}
        onClick={onCerrar}
        aria-hidden="true"
      />

      {/* Panel lateral; la clase "abierto" dispara la animación por CSS */}
      <aside className={`panel-carrito ${abierto ? 'abierto' : ''}`} aria-hidden={!abierto}>
        <div className="header-panel">
          <h2>Tu selección</h2>
          <button type="button" className="btn-cerrar" aria-label="Cerrar carrito" onClick={onCerrar}>
            ×
          </button>
        </div>

        <div className="contenido-carrito">
          {carrito.length === 0 ? (
            // Estado vacío
            <p className="mensaje-vacio-carrito">
              Todavía no elegiste ninguna pieza. Están esperando en el taller.
            </p>
          ) : (
            // Un bloque por cada producto del carrito
            carrito.map((item) => (
              <div key={item.id} className="item-carrito">
                {/* Si falla la carga de la imagen, se oculta */}
                <img
                  src={`${IMAGE_URL}${item.imagen}`}
                  alt={item.nombre}
                  className="item-imagen"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />

                <div className="item-detalles">
                  <h3 className="item-nombre">{item.nombre}</h3>
                  <p className="item-precio">{formatearPrecio(item.precio)} c/u</p>

                  <div className="item-controles">
                    <div className="controles-cantidad">
                      <button
                        type="button"
                        className="btn-cantidad"
                        onClick={() => onModificarCantidad(item.id, -1)}
                        aria-label="Restar una unidad"
                      >
                        -
                      </button>
                      <span className="cantidad-valor">{item.cantidad}</span>
                      <button
                        type="button"
                        className="btn-cantidad"
                        onClick={() => onModificarCantidad(item.id, 1)}
                        disabled={item.stock !== undefined && item.cantidad >= item.stock}
                        aria-label="Sumar una unidad"
                      >
                        +
                      </button>
                    </div>

                    <button type="button" className="btn-eliminar" onClick={() => onEliminar(item.id)}>
                      Quitar todo
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pie del panel: total y botón de compra (deshabilitado si el carrito está vacío) */}
        <div className="footer-panel">
          <div className="total-carrito">
            <span>Total:</span>
            <span>{formatearPrecio(totalPrecio)}</span>
          </div>
          <button type="button" className="btn-primario btn-bloque" disabled={carrito.length === 0}>
            Iniciar compra
          </button>
        </div>
      </aside>
    </>
  )
}