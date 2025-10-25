### Documentación de Endpoints

### Categorías

- **GET /api/v1/categories**
  Obtiene todas las categorías activas para roles administrativos (2 y 3).
  **Respuesta exitosa:**
    ```json
    {
    "result": [
        {
        "id_categoria": 1,
        "nombre": "Desayunos",
        "horario": "06:00-10:00",
        "descripcion": "Comidas para iniciar el día",
        "imagen_categoria": "base64"
        } 
        /* Más categorías */
    ]
    }
    ```
    **Errores posibles:** 
    - 401 No autenticado o sin permisos. 
    - 404 No hay categorías. 
    - 500 Error interno del servidor.

---
- **GET /api/v1/categories/home**
    Obtiene categorías visibles para seleccion de categorias en home (roles 1, 2 y 3).
  **Respuesta exitosa:**
    ```json
    {
    "result": [
        {
        "id_categoria": 1,
        "nombre": "Desayunos",
        "imagen_categoria": "base64"
        }
        /* Más categorías */
    ]
    }
    ```
    **Errores posibles:** 
        - 401 No autenticado o sin permisos. 
        - 404 No hay categorías. 
        - 500 Error interno del servidor.


---
- **GET /api/v1/categories/:idCategorie**
  Obtiene datos de una categoría específica por su ID para roles administrativos (2 y 3).
  **Respuesta exitosa:**
    ```json
    {
    "id_categoria": 1,
    "nombre": "Desayunos",
    "horario": "06:00-10:00",
    "descripcion": "Comidas para iniciar el día",
    "imagen_categoria": "base64"
    }
    ```
    **Errores posibles:**
        - 401 No autenticado o sin permisos.
        - 404 Categoría no encontrada.

---
- **POST /api/v1/categories**
  Crea una nueva categoría (roles 2 y 3).
  **Cuerpo de la solicitud:**
    ```json
    {
    "nombre": "Nombre de la categoría",
    "horario": "Horario disponible",
    "descripcion": "Descripción de la categoría",
    "imagen_categoria": "base64"
    }
    ```
    **Respuesta exitosa:**
    ```json
    {
    "id_categoria": 5,
    "message": "Categoría creada exitosamente"
    }
    ```
    **Errores posibles:** 
        - 401 No autenticado o sin permisos. 
        - 400 Nombre de categoría ya existe o datos inválidos. 
        - 404 No se creó la categoría.

---
- **PATCH /api/v1/categories/:id_categoria**
    Actualiza parcialmente una categoría (roles 2 y 3).
    **Cuerpo de la solicitud:**
    ```json 
    { 
        "nombre": "Nuevo nombre", 
        "horario": "Nuevo horario", 
        "descripcion": "Nueva descripción", 
        "imagen_categoria": "base64" 
    }
    ``` 
    **Respuesta exitosa:**
    ```json 
    { "message": "Categoría actualizada exitosamente" }
    ```  
    **Errores posibles:**
        - 401 No autenticado o sin permisos.
        - 400 No se enviaron campos válidos para actualizar.
        - 404 Categoría no encontrada o no actualizada.

---
- **DELETE /api/v1/categories/:id_categoria**
    Elimina una categoría específica (roles 2 y 3).
    **Respuesta exitosa:**
    ```json 
    { "message": "Categoría eliminada exitosamente" }  
    ```
    **Errores posibles:**
        - 401 No autenticado o sin permisos.
        - 404 Categoría no encontrada o no eliminada.
        - 400 Error en la solicitud.



### Notas
- Asegúrate de que el servidor esté en ejecución antes de realizar las solicitudes.  
- Utiliza herramientas como Postman o cURL para probar los endpoints.
