### Documentación de Endpoints - Favoritos

### Favoritos

- **GET /api/v1/favorites/getAllFavorites**
    Obtiene todos los favoritos para usuarios con roles 1, 2 y 3.
    **Respuesta exitosa:**
    ```json
        {
        "result": [
            {
            "id_favorito": 1,
            "id_usuario": 2,
            "id_producto": 5
            }
            /* Más favoritos */
        ]
    }
    ```
    **Errores posibles:**
    - 401 No autenticado o sin permisos.
    - 404 No hay favoritos.
    - 500 Error interno del servidor.

---
- **GET /api/v1/favorites/getFavoritesByUserId**
    Obtiene todos los favoritos del usuario autenticado (roles 1, 2 y 3).
    **Respuesta exitosa:**
    ```json
        {
        "result": [
            {
            "id_favorito": 3,
            "id_usuario": 4,
            "id_producto": 7
            }
            /* Más favoritos */
        ]
    }
    ```
    **Errores posibles:**
    - 401 No autenticado o sin permisos.
    - 404 Usuario no tiene favoritos.
    - 500 Error interno del servidor.

---
- **GET /api/v1/favorites/getFavoriteByUserIdAndProductId/:id_producto**
    Verifica si el producto con id_producto está marcado como favorito por el usuario autenticado (roles 1, 2 y 3).
    **Respuesta exitosa (producto marcado como favorito):**
    ``` json
        {
        "result": {
            "id_favorito": 5,
            "id_usuario": 2,
            "id_producto": 10
        },
        "is_favorite": true
        }
    ```
    **Respuesta cuando no está marcado como favorito:**
    ``` json
        {
        "message": "Producto no marcado como favorito",
        "is_favorite": false
        }
    ```
    **Errores posibles:**
    - 401 No autenticado o sin permisos.
    - 404 Producto no marcado como favorito.
    - 500 Error interno del servidor.

---
- **POST /api/v1/favorites/postFavorite/:id_producto**
    Agrega el producto con id_producto a favoritos del usuario autenticado (roles 1, 2 y 3).
    **Respuesta exitosa:**
    ```json
    {
    "message": "Agregado a favoritos exitosamente",
    "is_favorite": true
    }
    ```
    **Errores posibles:**
    - 401 No autenticado o sin permisos.
    - 409 Producto ya está en favoritos.
    - 404 No se agregó a favoritos.
    - 400 Error en la solicitud.


---
- **DELETE /api/v1/favorites/deleteFavorite/:id_producto**
    Elimina el producto con id_producto de favoritos del usuario autenticado (roles 1, 2 y 3).
    **Respuesta exitosa:**
    ``` json
    {
    "message": "Favorito Eliminado exitosamente"
    }
    ```
    **Errores posibles:**
    - 401 No autenticado o sin permisos.
    - 404 Favorito no encontrado o producto no está en favoritos.
    - 400 Error en la solicitud.


