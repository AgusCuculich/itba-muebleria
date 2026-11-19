# API Contract

Registro vivo del contrato de la API. Cada vez que se agregue o modifique un endpoint en `/backend`, actualizar este archivo en el mismo cambio.

---

## Modelos de Datos

### 1. Producto

Esquema basado en el modelo `Producto` (colección de MongoDB / seed en [`backend/data/products.js`](../backend/data/products.js)):

| Campo | Tipo | Descripción | Ejemplo |
| :--- | :--- | :--- | :--- |
| `id` | `string` | Identificador único en formato slug | `"aparador-uspallata"` |
| `nombre` | `string` | Nombre comercial del producto | `"Aparador Uspallata"` |
| `descripcion` | `string` | Descripción detallada del producto | `"Aparador de seis puertas..."` |
| `imagen` | `string` | Nombre del archivo o ruta de la imagen | `"aparador-uspallata.png"` |
| `precio` | `number` | Precio en moneda local | `380000` |
| `sustentable` | `boolean` | Indicador de producto sostenible | `true` |
| `especificaciones` | `object` | Atributos y detalles técnicos (dinámicos según el producto: medidas, materiales, acabado, peso, capacidad, etc.) | Ver ejemplo detallado abajo |

#### Ejemplo de Objeto Producto
```json
{
  "id": "aparador-uspallata",
  "nombre": "Aparador Uspallata",
  "descripcion": "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
  "imagen": "aparador-uspallata.png",
  "precio": 380000,
  "sustentable": true,
  "especificaciones": {
    "medidas": "180 x 45 x 75cm",
    "materiales": "Nogal macizo FSC®, herrajes de latón",
    "acabado": "Aceite natural ecológico",
    "peso": "68kg",
    "capacidad": "6 compartimentos interiores"
  }
}
```

### 2. Usuario

Esquema Mongoose (`models/Usuario.js`):

| Campo | Tipo | Descripción | Ejemplo |
| :--- | :--- | :--- | :--- |
| `_id` | `ObjectId` | Identificador único generado por MongoDB | `"65ab8f9e1234567890abcdef"` |
| `nombre` | `string` | Nombre completo del cliente | `"Juan Pérez"` |
| `email` | `string` | Correo electrónico único del usuario | `"juan@example.com"` |
| `password` | `string` | Contraseña hasheada con `bcrypt` (nunca se devuelve en respuestas) | `"$2b$10$..."` |

### 3. Pedido

Esquema Mongoose (`models/Pedido.js`):

| Campo | Tipo | Descripción | Ejemplo |
| :--- | :--- | :--- | :--- |
| `_id` | `ObjectId` | Identificador único del pedido | `"65ab8f9e0987654321fedcba"` |
| `usuario` | `ObjectId` | Referencia al `_id` del `Usuario` propietario del pedido | `"65ab8f9e1234567890abcdef"` |
| `items` | `array` | Lista de productos comprados (`productoId`, `cantidad`, `precio`) | Ver ejemplo en endpoint |
| `total` | `number` | Monto total del pedido | `380000` |
| `createdAt` | `Date` | Fecha y hora de creación (automática con `timestamps: true`) | `"2026-11-18T23:00:00.000Z"` |

---

## Endpoints

### Productos

#### 1. Obtener todos los productos
- **Método / Verbo HTTP:** `GET`
- **Ruta:** `/api/productos`
- **Descripción:** Devuelve la lista completa de todos los productos disponibles.
- **Body esperado:** Ninguno (`N/A`).
- **Respuesta de éxito (200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "aparador-uspallata",
        "nombre": "Aparador Uspallata",
        "descripcion": "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
        "imagen": "aparador-uspallata.png",
        "precio": 380000,
        "sustentable": true,
        "especificaciones": {
          "medidas": "180 x 45 x 75cm",
          "materiales": "Nogal macizo FSC®, herrajes de latón",
          "acabado": "Aceite natural ecológico",
          "peso": "68kg",
          "capacidad": "6 compartimentos interiores"
        }
      },
      {
        "id": "biblioteca-recoleta",
        "nombre": "Biblioteca Recoleta",
        "descripcion": "Sistema modular de estantes abierto que combina estructura de acero Sage Green y repisas en roble claro. Perfecta para colecciones y objetos de diseño, su diseño versátil se adapta a cualquier espacio contemporáneo con elegancia funcional.",
        "imagen": "biblioteca-recoleta.png",
        "precio": 310000,
        "sustentable": true,
        "especificaciones": {
          "medidas": "100 x 35 x 200cm",
          "materiales": "Estructura de acero, estantes de roble",
          "acabado": "Laca mate ecológica",
          "capacidad": "45kg por estante",
          "modulares": "5 estantes ajustables"
        }
      }
    ]
  }
  ```

#### 2. Obtener un producto por ID
- **Método / Verbo HTTP:** `GET`
- **Ruta:** `/api/productos/:id`
- **Descripción:** Busca y devuelve el detalle de un producto específico mediante su identificador (`id`). Si no existe, devuelve estado `404 Not Found`.
- **Parámetros de ruta:**
  - `id` (`string`): Identificador del producto (ejemplo: `aparador-uspallata`).
- **Body esperado:** Ninguno (`N/A`).
- **Respuesta de éxito (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "id": "aparador-uspallata",
      "nombre": "Aparador Uspallata",
      "descripcion": "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
      "imagen": "aparador-uspallata.png",
      "precio": 380000,
      "sustentable": true,
      "especificaciones": {
        "medidas": "180 x 45 x 75cm",
        "materiales": "Nogal macizo FSC®, herrajes de latón",
        "acabado": "Aceite natural ecológico",
        "peso": "68kg",
        "capacidad": "6 compartimentos interiores"
      }
    }
  }
  ```
- **Respuesta de error (404 Not Found):**
  ```json
  {
    "success": false,
    "message": "Producto no encontrado"
  }
  ```

---

### Autenticación

#### 3. Registro de Usuario
- **Método / Verbo HTTP:** `POST`
- **Ruta:** `/api/auth/registro`
- **Descripción:** Crea una nueva cuenta de usuario validando que el email no exista previamente y hasheando la contraseña con `bcrypt` antes de persistirla.
- **Body esperado:**
  ```json
  {
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "password": "miPasswordSeguro123"
  }
  ```
- **Respuesta de éxito (201 Created):**
  ```json
  {
    "success": true,
    "message": "Usuario registrado exitosamente"
  }
  ```
- **Respuesta de error (400 Bad Request):**
  ```json
  {
    "success": false,
    "message": "El email ya está registrado o faltan campos obligatorios"
  }
  ```

#### 4. Login de Usuario
- **Método / Verbo HTTP:** `POST`
- **Ruta:** `/api/auth/login`
- **Descripción:** Valida las credenciales del usuario contra la base de datos y devuelve un JSON Web Token (JWT) firmado junto con los datos públicos del usuario.
- **Body esperado:**
  ```json
  {
    "email": "juan@example.com",
    "password": "miPasswordSeguro123"
  }
  ```
- **Respuesta de éxito (200 OK):**
  ```json
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "data": {
      "id": "65ab8f9e1234567890abcdef",
      "nombre": "Juan Pérez",
      "email": "juan@example.com"
    }
  }
  ```
- **Respuesta de error (401 Unauthorized):**
  ```json
  {
    "success": false,
    "message": "Credenciales inválidas"
  }
  ```

#### 5. Obtener Perfil del Usuario (Ruta Protegida)
- **Método / Verbo HTTP:** `GET`
- **Ruta:** `/api/auth/perfil`
- **Descripción:** Devuelve los datos del usuario autenticado a partir del JWT recibido. Sirve para validar sesión activa y poblar la vista `/perfil`.
- **Headers requeridos:** `Authorization: Bearer <token_jwt>`
- **Body esperado:** Ninguno (`N/A`).
- **Respuesta de éxito (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "id": "65ab8f9e1234567890abcdef",
      "nombre": "Juan Pérez",
      "email": "juan@example.com"
    }
  }
  ```
- **Respuesta de error (401 Unauthorized):**
  ```json
  {
    "success": false,
    "message": "Token no proporcionado o inválido"
  }
  ```

---

### Pedidos

#### 6. Crear Pedido (Ruta Protegida)
- **Método / Verbo HTTP:** `POST`
- **Ruta:** `/api/pedidos`
- **Descripción:** Registra un nuevo pedido asociándolo automáticamente al usuario autenticado mediante el JWT.
- **Headers requeridos:** `Authorization: Bearer <token_jwt>`
- **Body esperado:**
  ```json
  {
    "items": [
      {
        "productoId": "aparador-uspallata",
        "cantidad": 1,
        "precio": 380000
      }
    ],
    "total": 380000
  }
  ```
- **Respuesta de éxito (201 Created):**
  ```json
  {
    "success": true,
    "message": "Pedido registrado exitosamente",
    "data": {
      "pedidoId": "65ab8f9e0987654321fedcba",
      "total": 380000
    }
  }
  ```
- **Respuesta de error (400 Bad Request / 401 Unauthorized):**
  ```json
  {
    "success": false,
    "message": "El carrito está vacío o el token es inválido"
  }
  ```

#### 7. Obtener Mis Pedidos (Ruta Protegida)
- **Método / Verbo HTTP:** `GET`
- **Ruta:** `/api/pedidos/mis-pedidos`
- **Descripción:** Devuelve el historial de pedidos asociados al usuario autenticado para la vista `/mis-pedidos`.
- **Headers requeridos:** `Authorization: Bearer <token_jwt>`
- **Body esperado:** Ninguno (`N/A`).
- **Respuesta de éxito (200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "65ab8f9e0987654321fedcba",
        "items": [
          {
            "productoId": "aparador-uspallata",
            "cantidad": 1,
            "precio": 380000
          }
        ],
        "total": 380000,
        "createdAt": "2026-11-18T23:00:00.000Z"
      }
    ]
  }
  ```
- **Respuesta de error (401 Unauthorized):**
  ```json
  {
    "success": false,
    "message": "Token no proporcionado o inválido"
  }
  ```