# Backend.md (Node.js + express)
Construir un servidor web y una API REST básica utilizando Node.js y Express.

## Rol del agente
Sos un desarrollador backend experimentado, especializado en Node.js y Express. Trabajás exclusivamente sobre `/backend`: servidor, ruteo, middlewares y contrato de la API. No modificás código de `/client` (eso está a cargo de `frontend.md`). Escribís código simple, modular y prolijo, siguiendo estándares REST, y no asumís reglas ni datos de negocio que no estén confirmados (ver "Principio general: no inventar datos del negocio" en `agents.md`).

## Datos
- Datos de productos en archivo `.js` local (`/backend/data/products.js`), como array de objetos en memoria. No hay base de datos.
- Estructura confirmada de cada producto:
  - `id` (`string`): Identificador único en formato slug (ej. `"aparador-uspallata"`).
  - `nombre` (`string`): Nombre comercial (ej. `"Aparador Uspallata"`).
  - `descripcion` (`string`): Descripción del producto.
  - `imagen` (`string`): Nombre del archivo en formato kebab-case (ej. `"aparador-uspallata.png"`).
  - `precio` (`number`): Precio en moneda local.
  - `sustentable` (`boolean`): Indicador de sostenibilidad.
  - `especificaciones` (`object`): Especificaciones técnicas (medidas, materiales, acabado, peso, etc.).

## Ruteo
- Definir y organizar rutas de API de forma modular con `express.Router`.
- **Códigos de estado semánticos:**
    - `200 OK` (Éxito).
    - `201 Created` (Éxito).
    - `400 Bad Request` (Error de validación del cliente).
    - `401 Unauthorized` (sin uso todavía; reservado para cuando exista autenticación).
    - `403 Forbidden` (problemas de seguridad/roles; sin uso todavía).
    - `404 Not Found` (recurso inexistente).
    - `500 Internal Server Error` (fallo de nuestro código).

## Recurso `/api/productos`
- `GET /api/productos` → listado completo en JSON.
- `GET /api/productos/:id` → producto por id, `404` si no existe.
- Todavía **no** se podrán realizar acciones de baja, alta ni modificación (no hay `POST`/`PUT`/`DELETE` en esta etapa).

## Archivos estáticos (imágenes de productos)
- Las imágenes de los productos se almacenan dentro de la carpeta `/backend/public/` (o subcarpetas como `/backend/public/images/`).
- Se sirven a través del middleware `express.static('public')` (o usando ruta absoluta con `path.join(__dirname, 'public')`).

## Middleware
- `express.static('public')` para servir archivos estáticos (imágenes, etc.).
- `express.json()` para futuras peticiones `POST`.
- Middleware global de logging (método y URL).
- Manejador de 404 para rutas no definidas.
- Manejador de errores centralizado.

## Orden esperado de montaje en `server.js`
1. `express.static('public')` (o sobre la ruta configurada)
2. `express.json()`
3. Middleware de logging
4. Rutas (`productRoutes.js` montado bajo `/api/productos`)
5. Manejador de 404
6. Manejador de errores centralizado (siempre al final)

## Estructura:
/backend
├── data/
│   └── products.js
├── middleware/
│   └── logger.js
├── public/
│   └── images/
├── routes/
│   └── productRoutes.js
└── server.js

## Documentación
Mantener actualizado el archivo `docs/api-contract.md`. Ahí se debe llevar un registro de **cada endpoint creado o actualizado**. Para cada endpoint incluir:
1. El verbo HTTP y la ruta (siguiendo estándares REST).
2. Una breve descripción.
3. El `body` esperado (si aplica) en formato JSON.
4. La estructura de respuesta de éxito (ej. `{ success: true, data: ... }`).
Cada vez que se agregue o modifique un endpoint en `/backend`, actualizar `docs/api-contract.md` en el mismo cambio, no después.

## Datos y Base de Datos
- **MongoDB + Mongoose:** Los datos persisten en una base de datos MongoDB (MongoDB Atlas en producción). 
- **Modelos:**
  - `Producto`: Gestiona el catálogo (solo lectura por ahora).
  - `Usuario`: Almacena `nombre`, `email` y `password`. La contraseña **debe** guardarse hasheada usando `bcrypt`.
  - `Pedido`: Almacena la referencia al `Usuario` (ObjectId), los items comprados y el total.

## Autenticación y Seguridad
- **JWT (JSON Web Tokens):** El inicio de sesión genera un token firmado que el cliente debe enviar en el header `Authorization: Bearer <token>` para rutas protegidas.
- **Middleware de Autorización:** Se requiere un middleware (`middleware/auth.js`) que verifique la validez del token JWT y adjunte el payload del usuario al objeto `req` (`req.usuario`).

## Nuevos Recursos (Rutas)
- `/api/auth/registro` (POST) → Crea un nuevo usuario hasheando la contraseña.
- `/api/auth/login` (POST) → Verifica credenciales y devuelve un JWT.
- `/api/pedidos` (POST) → Ruta protegida (requiere JWT). Recibe un carrito y crea un pedido asociado al usuario logueado.