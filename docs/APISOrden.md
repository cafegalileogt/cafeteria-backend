## Documentación de Endpoints

### Ordenes de Carrito 

**Endpoint:** `POST /api/v1/orders/create`  

**Descripción:** Crea una nueva orden de compra.  
**Autenticación:** Este endpoint requiere un JWT enviado en las cookies ( la cookie de sesión del usuario que contiene el token ).  
**Cuerpo de la solicitud | Example:**  
```json
{
        "order": {
            "total": 150.6
        },
        "details": [
            {
                "id_producto": 1,
                "cantidad": 2,
                "precio_unitario": 30.12
            },
            {
                "id_producto": 2,
                "cantidad": 3,
                "precio_unitario": 30.12
            }
        ]
    } 
  ```

  **Respuesta exitosa:**  
  ```json  
  {
    "message": "Orden creada exitosamente",
    "orderId": 123
  }  
  ```

## Obtener pedidos por ID de usuario

**Endpoint:** `GET /api/v1/orders/historial/:usuarioId`

**Descripción:** Obtiene todos los pedidos realizados por un usuario específico.

**Parámetros de la URL:**
- `usuarioId`: ID del usuario para el cual se desean obtener los pedidos.

**Respuesta:**
- **200 OK**: Devuelve una lista de pedidos del usuario.
- **404 Not Found**: Si no se encuentran pedidos para el usuario.

---

## Obtener detalles de un pedido por ID de pedido

**Endpoint:** `GET /api/v1/orders/detalle/:numero_orden`

**Descripción:** Obtiene los detalles de un pedido específico.

**Parámetros de la URL:**
- `numero_orden`: ID del pedido del cual se desean obtener los detalles.

**Respuesta:**
- **200 OK**: Devuelve los detalles del pedido.
- **404 Not Found**: Si no se encuentra el pedido.

---

## Actualizar el estado de un pedido

**Endpoint:** `PATCH  /api/v1/orders/actualizar_estado/:numero_orden`

**Descripción:** Actualiza el estado de un pedido específico.

**Parámetros de la URL:**
- `numero_orden`: ID del pedido que se desea actualizar.

**Cuerpo de la solicitud:**
```json
{
  "estado": "<nuevo estado>"
  "id_personal": "<ID del personal que realiza el cambio>"
}
```

**Respuesta:**
- **200 OK**: Si el estado se actualiza exitosamente.
- **404 Not Found**: Si no se encuentra el pedido.
- **400 Bad Request**: Si hay un error en los datos proporcionados.