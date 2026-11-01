# Hermanos Jota — Mueblería de Diseño y Carpintería Artesanal

Proyecto desarrollado para la diplomatura / curso de desarrollo web de **ITBA** (Sprints 3 y 4). Aplicación web fullstack compuesta por una API REST construida con Node.js, Express y MongoDB (Mongoose), y una Single Page Application (SPA) interactiva desarrollada con React 19, Vite y Tailwind CSS v4.

---

## 👥 Integrantes del Equipo

- **Agustina Cuculich**
- **Rodrigo Antelo**
- **Delfina Moschella**

---

## 🌐 Despliegue en Producción (Live Demo)

El proyecto se encuentra preparado y configurado para su despliegue continuo en la nube, desacoplando cliente y servidor:

| Servicio | Plataforma | Enlace de Acceso |
| :--- | :--- | :--- |
| **Frontend (Cliente)** | **Vercel** | [https://itba-muebleria.vercel.app](https://itba-muebleria.vercel.app) |
| **Backend (API REST)** | **Render** | [https://backend-itba-muebleria.onrender.com](https://backend-itba-muebleria.onrender.com) |
| **Base de Datos** | **MongoDB Atlas** | Cluster en la nube (MongoDB Atlas) |

---

## 📋 Tabla de Contenidos

1. [Enlaces de Despliegue](#-despliegue-en-producción-live-demo)
2. [Descripción del Proyecto](#-descripción-del-proyecto)
3. [Estructura del Proyecto](#-estructura-del-proyecto)
4. [Requisitos Previos](#-requisitos-previos)
5. [Instrucciones de Instalación y Ejecución](#-instrucciones-de-instalación-y-ejecución)
   - [Paso 1: Clonar el repositorio](#paso-1-clonar-el-repositorio)
   - [Paso 2: Servidor Backend (Node.js + Express + MongoDB)](#paso-2-servidor-backend-nodejs--express--mongodb)
   - [Paso 3: Servidor Frontend (Cliente React + Vite)](#paso-3-servidor-frontend-cliente)
6. [Arquitectura y Decisiones Técnicas](#-arquitectura-y-decisiones-técnicas)
   - [Backend & Base de Datos (Node.js + Express + MongoDB con Mongoose)](#backend-y-base-de-datos-nodejs--express--mongodb-con-mongoose)
   - [Frontend (React 19 + Vite + Tailwind CSS v4)](#frontend-react-19--vite--tailwind-css-v4)
   - [Contrato de API y Comunicación](#contrato-de-api-y-comunicación)
   - [Identidad Visual y Accesibilidad](#identidad-visual-y-accesibilidad)
7. [Resumen de Endpoints de la API](#-resumen-de-endpoints-de-la-api)

---

## 📖 Descripción del Proyecto

**Hermanos Jota** es una mueblería y taller de carpintería artesanal fundada en 1960 en Buenos Aires bajo los principios de la corriente estética **Mid-Century Modern** y la sustentabilidad. 

En esta etapa del proyecto:
- **Base de Datos NoSQL y Persistencia:** Se integró **MongoDB** (mediante **Mongoose**) para almacenar y gestionar de forma persistente todo el catálogo de productos, reemplazando la persistencia en memoria por una solución escalable y lista para producción.
- **API REST con CRUD Completo:** Se implementó una API modular en Express con operaciones de lectura, creación, edición y baja de productos (`GET`, `POST`, `PUT`, `DELETE`), generación automatizada de identificadores legibles (`slugs`) con `slugify` y validaciones estrictas de esquema.
- **Frontend Interactivo en React:** Una Single Page Application moderna con React 19 y Vite que consume la API REST, con catálogo responsivo, filtros, vista de producto, carrito de compras, formulario de contacto accesible y navegación fluida mediante React Router.
- **Despliegue en la Nube:** Arquitectura desacoplada con el backend alojado en **Render** conectado a **MongoDB Atlas**, y el frontend alojado en la red perimetral de **Vercel**.

---

## 📂 Estructura del Proyecto

El repositorio adopta un esquema desacoplado cliente-servidor:

```
itba-sprints-3-4/
├── backend/                  # Servidor API REST (Node.js + Express + Mongoose)
│   ├── config/               # Configuración y conexión a la base de datos (db.js)
│   ├── data/                 # Datos iniciales para seed/población (products.js)
│   ├── middleware/           # Middlewares personalizados (logger, validaciones, etc.)
│   ├── models/               # Esquemas y modelos de Mongoose (productModel.js)
│   ├── public/               # Archivos estáticos servidos (imágenes de productos)
│   │   └── images/
│   ├── routes/               # Enrutamiento modular de la API (productRoutes.js)
│   ├── scripts/              # Scripts de mantenimiento y carga inicial (seed.js)
│   ├── .env.example          # Plantilla de variables de entorno para el backend
│   ├── package.json
│   └── server.js             # Punto de entrada del servidor Express
│
├── client/                   # Aplicación cliente SPA (React + Vite)
│   ├── src/
│   │   ├── components/       # Componentes reutilizables (Navbar, Footer, Layout, ProductCard, etc.)
│   │   ├── pages/            # Páginas o vistas principales (Home, Contacto, Producto, etc.)
│   │   ├── services/         # Servicios de consumo HTTP / API (api.js)
│   │   ├── index.css         # Configuración del tema y estilos globales (Tailwind v4)
│   │   └── main.jsx          # Punto de entrada y configuración de React Router
│   ├── package.json
│   └── vite.config.js
│
├── docs/                     # Documentación de arquitectura
│   └── api-contract.md       # Contrato de datos y especificación de endpoints
├── agents.md                 # Lineamientos generales y principios del proyecto
├── backend.md                # Especificaciones de desarrollo backend
├── frontend.md               # Manual de marca, diseño y desarrollo frontend
└── README.md                 # Documento principal del repositorio
```

---

## ⚙️ Requisitos Previos

Para ejecutar la aplicación en un entorno local, asegurate de tener instalado:
- **Node.js**: versión 18.0.0 o superior (recomendado Node 20 LTS o superior).
- **npm**: versión 9.0.0 o superior (incluido automáticamente con Node.js).
- **MongoDB**: una instancia local en ejecución o un cluster gratuito en [MongoDB Atlas](https://www.mongodb.com/atlas) con su URI de conexión.
- **Git**: para clonar y gestionar el repositorio.

---

## 🚀 Instrucciones de Instalación y Ejecución

Se recomienda abrir dos pestañas de terminal independientes: una para el **backend** y otra para el **frontend**.

### Paso 1: Clonar el repositorio

```bash
git clone https://github.com/AgusCuculich/itba-sprints-3-4.git
cd itba-sprints-3-4
```

---

### Paso 2: Servidor Backend (Node.js + Express + MongoDB)

El servidor backend gestiona la API REST conectada a MongoDB y sirve las imágenes estáticas de los productos.

1. Navegá al directorio del backend:
   ```bash
   cd backend
   ```

2. Instalá las dependencias del backend:
   ```bash
   npm install
   ```

3. Configurá las variables de entorno:
   Creá un archivo `.env` en la raíz de `backend/` a partir de `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Editá el archivo `.env` con los valores correspondientes:
   ```env
   PORT=3000
   MONGO_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/<database_name>
   ```
   *(También podés utilizar una URI local, por ejemplo: `mongodb://localhost:27017/muebleria_db`)*

4. **Poblar la base de datos (Seed inicial):**
   Para cargar el catálogo inicial de productos desde `backend/data/products.js` hacia MongoDB, ejecutá:
   ```bash
   npm run seed
   ```
   > Este script limpia la colección anterior e inserta los productos generando sus slugs automáticamente.

5. Iniciá el servidor:
   - **En modo desarrollo (con carga de `.env`):**
     ```bash
     npm run dev
     ```
   - **En modo producción:**
     ```bash
     npm start
     ```

> ℹ️ El servidor backend se ejecutará en **`http://localhost:3000`**.  
> Podés verificar el correcto funcionamiento ingresando en tu navegador o cliente HTTP a:  
> `http://localhost:3000/api/productos`

---

### Paso 3: Servidor Frontend (Cliente)

El frontend está desarrollado con Vite y React, optimizado para recarga rápida en desarrollo (HMR).

1. En una nueva terminal, navegá a la carpeta del cliente desde la raíz del proyecto:
   ```bash
   cd client
   ```

2. Instalá las dependencias del frontend:
   ```bash
   npm install
   ```

3. Iniciá el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abrí tu navegador e ingresá a la URL provista por Vite:
   ```
   http://localhost:5173
   ```

---

## 🏗️ Arquitectura y Decisiones Técnicas

### Backend y Base de Datos (Node.js + Express + MongoDB con Mongoose)

- **Persistencia en MongoDB con Mongoose:** Se migró de la persistencia en memoria hacia MongoDB Atlas mediante Mongoose ODM, permitiendo almacenamiento duradero, transaccional y escalable.
- **Conexión asíncrona y Graceful Shutdown:** La conexión a la base de datos se establece antes de iniciar la escucha del servidor Express (`connectToMongoDB()`). Se interceptan las señales `SIGINT` y `SIGTERM` para cerrar la conexión de forma segura (`disconnectFromMongoDB()`) sin dejar conexiones colgadas.
- **Modelo de Productos y Validaciones de Esquema:**
  - `nombre`: Tipo `String`, requerido.
  - `descripcion`: Tipo `String`.
  - `precio`: Tipo `Number`, requerido y con valor mínimo `0`.
  - `stock`: Tipo `Number`, con valor mínimo `0`.
  - `imagen`: Tipo `String` con el nombre del archivo.
  - `slug`: Tipo `String`, único y requerido.
- **Slugs Automáticos con Hook Mongoose:** Mediante un middleware `pre('validate')` en el esquema, se genera automáticamente un slug URL-friendly a partir del nombre del producto utilizando `slugify` (`{ lower: true, strict: true }`).
- **Búsqueda Dual Dinámica (`_id` o `slug`):** Los endpoints de consulta, actualización y eliminación (`GET /:slug`, `PUT /:slug`, `DELETE /:slug`) detectan automáticamente si el parámetro es un `ObjectId` válido de MongoDB (`mongoose.Types.ObjectId.isValid()`) o un `slug`, adaptando la consulta dinámicamente (`{ _id }` vs `{ slug }`).
- **Manejo Centralizado de Errores:** Se capturan y formatean errores específicos de Mongoose:
  - Errores de validación (`ValidationError` / `CastError`) retornando estado `400 Bad Request`.
  - Violación de índices únicos (código `11000`) retornando `400 Bad Request`.
  - Errores no controlados retornando `500 Internal Server Error` sin exponer stack traces al cliente.
- **Servicio de Archivos Estáticos:** Las fotografías de los muebles se sirven públicamente a través de `express.static('public')`, permitiendo su consumo bajo la ruta `/images/<nombre-archivo>`.
- **CORS Habilitado:** Middleware `cors` configurado para permitir peticiones seguras desde el cliente tanto en entorno local como en producción.

### Frontend (React 19 + Vite + Tailwind CSS v4)

- **Vite como Bundler:** Compilación ultrarrápida, soporte nativo de módulos ES (ESM) y Hot Module Replacement (HMR).
- **React 19 & Componentes Funcionales:** Uso de la última versión de React, componentes modulares con separación de responsabilidades y hooks de estado y ciclo de vida.
- **Ruteo Declarativo con React Router:** Implementación con `createBrowserRouter` y un componente `Layout` compartido con `<Outlet />` para mantener constante la navegación (`NavBar`) y el pie de página (`Footer`).
- **Capa de Servicios Aislada:** Llamadas HTTP centralizadas en `src/services/api.js`, abstrayendo a los componentes de los detalles de red y soportando cancelación de peticiones con `AbortController`.
- **Formularios Controlados y Accesibles:** Formulario de Contacto con validación en tiempo real y atributos de accesibilidad semántica (`role="alert"`, `aria-live="polite"`, `aria-invalid`).

### Contrato de API y Comunicación

- Formato de respuesta JSON estandarizado:
  - Éxito: `{ "success": true, "data": ... }` o `{ "mensaje": "...", "producto": ... }`.
  - Error: `{ "success": false, "message": "..." }`.
- Códigos de estado HTTP semánticos: `200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`, `500 Internal Server Error`.
- Documento de referencia completo en [docs/api-contract.md](docs/api-contract.md).

### Identidad Visual y Accesibilidad

- **Tailwind CSS v4 con `@theme`:** Sistema de diseño sin archivo de configuración externo, definido en `src/index.css` con tokens de la paleta **Mid-Century Modern**:
  - `siena` (`#A0522D`): Acentos principales, títulos y botones.
  - `salvia` (`#87A96B`): Acentos secundarios y sustentabilidad.
  - `alabastro` (`#F5E6D3`): Tono cálido de fondo principal.
  - `vara-de-oro` (`#D4A437`): Detalles y elementos destacados.
  - `rosa-polvoriento` (`#C47A6D`): Acentos suaves y alertas.
  - `carbon` (`#1A1A1A`): Color de textos principales con óptimo contraste.
- **Tipografía Editorial:** Integración mediante `@fontsource` de **Playfair Display** (títulos con impronta clásica y artesanal) e **Inter** (cuerpo de texto moderno y legible).
- **Accesibilidad (WCAG AA):** Ratios de contraste adecuados, soporte semántico y diseño responsivo para móviles, tablets y desktop.

---

## 🔌 Resumen de Endpoints de la API

La API REST expone un CRUD completo bajo el prefijo `/api/productos`:

| Método | Endpoint | Descripción | Body (Payload) | Código Exitoso |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/productos` | Obtiene el listado completo de productos | Ninguno | `200 OK` |
| `GET` | `/api/productos/:slug` | Obtiene un producto por su `slug` o `_id` | Ninguno | `200 OK` (`404` si no existe) |
| `POST` | `/api/productos` | Crea un nuevo producto en la base de datos | JSON con datos del producto | `201 Created` (`400` si falla validación) |
| `PUT` | `/api/productos/:slug` | Actualiza un producto existente por `slug` o `_id` | JSON con campos a modificar | `200 OK` (`400` o `404`) |
| `DELETE`| `/api/productos/:slug` | Elimina un producto por su `slug` o `_id` | Ninguno | `200 OK` (`404` si no existe) |

Para ver la estructura detallada de cada payload y ejemplos de respuesta, consultá el archivo [docs/api-contract.md](docs/api-contract.md).