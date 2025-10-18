## Documentación de Endpoints

### Productos

- **POST /api/v1/products/create_product**  
  Crea un nuevo producto.  
  **Cuerpo de la solicitud:**  
  ```json  
  {
    "nombre": "Nombre del producto",
    "precio": 100,
    "descripcion": "Descripción del producto",
    "estado": true,
    "imagen_producto": "ruta/imagen.jpg",
    "id_categoria": 1
  } 
  ```  
  **Respuesta exitosa:**  
  ```json  
  {
    "message": "Producto creado exitosamente"
  }  
  ```
  **Errores posibles**
    - 401 No autenticado o sin permisos.
    - 400 Campos obligatorios faltantes o inválidos.

  ---

- **GET /api/v1/products/product_by_id/:id_producto**  
  Obtiene un producto específico por su ID.
  **Respuesta exitosa:**  
  ```json  
  {
    "id_producto": 1,
    "nombre": "Nombre del producto",
    "precio": 100,
    "descripcion": "Descripción del producto",
    "estado": true,
    "imagen_producto": "ruta/imagen.jpg",
    "id_categoria": 1
  }  
  ```
  **Errores posibles**
    - 401 No autenticado o sin permisos.
    - 404 Producto no encontrado.

  ---
- **GET /api/v1/products/categories**  
  Obtiene todos los productos activos de las categorías existentes.   
  **Respuesta exitosa:**  
  ```json  
  {       
    "result": [ /* arreglo de productos */ ]
  }   
  ```
  **Errores posibles**
    - 401 No autenticado o sin permisos.
    - 404 No se encontraron productos.
    - 400 Error en la solicitud.
---
- **GET /api/v1/products/categories/:idCategorie**  
  Obtiene productos activos filtrados por categoría.   
  **Respuesta exitosa:**  
  ```json  
  {       
    "result": [ /* arreglo de productos en la categoría */ ]
  }   
  ```
  **Errores posibles**
    - 401 No autenticado o sin permisos.
    - 404 No se encontraron productos en la categoría.
    - 400 Error en la solicitud.

---
- **PATCH /api/v1/products/:id_producto**  
  Actualiza parcialmente un producto dado.  
  **Cuerpo de la solicitud:**  
  ```json  
  {
  "nombre": "Nuevo nombre",
  "precio": 150,
  "descripcion": "Nueva descripción",
  "estado": true,
  "imagen_producto": "ruta/imagen.jpg"
  } 
  ```  
  **Respuesta exitosa:**  
  ```json  
  {
  "message": "Producto actualizado exitosamente"
  }  
  ```
  **Errores posibles**
    - 401 No autenticado o sin permisos.
    - 400 No se enviaron campos para actualizar o campos inválidos.
    - 404 Producto no encontrado o no actualizado.

---
- **DELETE /api/v1/products/:id_producto**  
  Elimina un producto específico.  
  
  **Respuesta exitosa:**  
  ```json  
  {
  "message": "Producto eliminado exitosamente"
  }  
  ```
  **Errores posibles**
    - 401 No autenticado o sin permisos.
    - 404 Producto no encontrado o no eliminado.
    - 400 Error en la solicitud.


### Notas
- Asegúrate de que el servidor esté en ejecución antes de realizar las solicitudes.  
- Utiliza herramientas como Postman o cURL para probar los endpoints.
