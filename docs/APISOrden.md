## Documentación de Endpoints

### Ordenes de Carrito 

- **POST /api/v1/auth/orders/create**  
  Crea una nueva orden de compra.  
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