## Documentación de Endpoints

### Autenticación

- **POST /api/v1/auth/login**  
  Inicia sesión con las credenciales del usuario.  
  **Cuerpo de la solicitud:**  
  ```json  
  {  
    "email": "usuario@example.com",  
    "password": "tu_contraseña"  
  }  
  ```  

- **POST /api/v1/auth/logout**  
  Cierra sesión del usuario.  

- **POST /api/v1/auth/forgot-password**  
  Envía un correo electrónico para restablecer la contraseña.  
  **Cuerpo de la solicitud:**  
  ```json  
  {  
    "email": "usuario@example.com"  
  }  
  ```  

- **POST /api/v1/auth/reset-password/:token**  
  Restablece la contraseña del usuario utilizando un token.  
  **Cuerpo de la solicitud:**  
  ```json  
   {  
    "newPassword": "nueva contraseña "  
  }  
  ```

- **GET /api/v1/auth/activate/:token**  
  Activa la cuenta del usuario utilizando un token.
  **Respuesta exitosa:**  
  ```json  
  {  
    "message": "Cuenta activada exitosamente"  
  }  
  ```

### Registro de Estudiantes

- **POST /api/v1/auth/register-student**  
  Registra un nuevo estudiante.  
  **Cuerpo de la solicitud:**  
  ```json  
  {  
    "name": "Nombre del Estudiante",  
    "email": "estudiante@example.com",  
    "password": "tu_contraseña"  
  }  
  ```  

### Productos

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
