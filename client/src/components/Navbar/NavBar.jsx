import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import './NavBar.css'

// Links de navegación definidos como datos: agregar una página nueva
// es sumar una línea acá, en vez de copiar un bloque <li> entero.
const LINKS = [
  { href: '/', texto: 'Home' },
  { href: '/productos', texto: 'Catálogo' },
  { href: '/contacto', texto: 'Contacto' },
]

export const NavBar = ({ contador, onAbrirCarrito }) => {
  const [menuAbierto, setMenuAbierto] = useState(false)

  const cerrarMenu = () => setMenuAbierto(false)

  return (
    <header className="header-principal">
      <div className="header-contenido">
        <Link to="/" className="logo-link" onClick={cerrarMenu}>
          <img className="img-logo" src="http://localhost:3000/images/logo.svg" alt="Hermanos Jota" />
        </Link>

        {/* Navegación (en desktop horizontal, en mobile desplegable) */}
        <nav className={`navegacion-principal ${menuAbierto ? 'abierto' : ''}`}>
          <ul className="lista-nav">
            {LINKS.map(({ href, texto }) => (
              <li key={href}>
                <NavLink
                  to={href}
                  end
                  className={({ isActive }) => `link-nav ${isActive ? 'activo' : ''}`}
                  onClick={cerrarMenu}
                >
                  {texto}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* En mobile, el botón de admin se muestra dentro del menú desplegable */}
          <div className="admin-nav-mobile">
            <Link
              to="/admin/crear-producto"
              className="btn-acceso-admin"
              onClick={cerrarMenu}
            >
              Acceso administradores
            </Link>
          </div>
        </nav>

        {/* Acciones de cabecera derecha */}
        <div className="acciones-header">
          {/* En desktop, el botón de admin se muestra en la barra */}
          <Link
            to="/admin/crear-producto"
            className="btn-acceso-admin admin-desktop"
          >
            Acceso administradores
          </Link>

          {/* Botón del carrito: avisa al padre que hay que abrir el panel */}
          <button
            type="button"
            className="contenedor-carrito"
            aria-label="Carrito de compras"
            onClick={onAbrirCarrito}
          >
            {/* Ícono de carrito (SVG inline para poder colorearlo con currentColor) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M15 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M17 17h-11v-14h-2" />
              <path d="M6 5l14 1l-1 7h-13" />
            </svg>

            {/* El contador solo se muestra si hay productos */}
            {contador > 0 && (
              <span className="badge-carrito" id="contador-carrito">
                {contador}
              </span>
            )}
          </button>

          {/* Botón hamburguesa (solo mobile) */}
          <button
            type="button"
            className="btn-hamburguesa"
            aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuAbierto}
            onClick={() => setMenuAbierto((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {menuAbierto ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}