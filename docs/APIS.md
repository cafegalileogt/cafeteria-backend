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
    "password": "nueva_contraseña"  
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

### Notas
- Asegúrate de que el servidor esté en ejecución antes de realizar las solicitudes.  
- Utiliza herramientas como Postman o cURL para probar los endpoints.
