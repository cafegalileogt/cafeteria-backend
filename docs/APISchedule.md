## Documentación de Endpoints

### Horarios

- **PUT /api/v1/schedule/updateSchedule/:dia**  
  Actualiza el horario de un día específico.  
  **Parámetros de la URL:**  
  - `dia`: Día de la semana a actualizar (por ejemplo, "Lunes", "Martes", etc.).  
  **Cuerpo de la solicitud | Example:**  
  ```json  
    {
        "id_schedule": 1,
        "dia_semana": "Lunes",
        "hora_apertura": "06:00:00",
        "hora_cierre": "17:00:00",
        "is_closed": 0
    }
  ```  
  **Respuesta exitosa:**  
  ```json  
  {
    "message": "Horario actualizado exitosamente"
  }  
  ```
  **Errores posibles**
    - 401 No autenticado o sin permisos.
    - 400 Campos obligatorios faltantes o inválidos.

  ---

- **GET /api/v1/schedule/getSchedule**  
  Obtiene los horarios de todos los días de la semana.
    **Respuesta exitosa:**  
    ```json  
    {       
        "schedules": [ {
            "id_schedule": 1,
            "dia_semana": "Lunes",
            "hora_apertura": "06:00:00",
            "hora_cierre": "17:00:00",
            "is_closed": 0
        },
        {
            "id_schedule": 2,
            "dia_semana": "Martes",
            "hora_apertura": "06:00:00",
            "hora_cierre": "17:00:00",
            "is_closed": 0
        }]
    }   
    ```
    **Errores posibles**
      - 401 No autenticado o sin permisos.
      - 404 No se encontraron horarios.
      - 400 Error en la solicitud.

### Excepciones de Horario

- **POST /api/v1/schedule/createException**  
  Crea una nueva excepción de horario.  
  **Cuerpo de la solicitud | Example:**  
  ```json  
  {
      "fecha_excepcion": "2025-11-02",
      "hora_apertura": "10:00",
      "hora_cierre": "17:00",
      "is_closed": 1,
      "descripcion": "Dia de los Santos"
  }
  ```  
  **Respuesta exitosa:**  
  ```json  
  {
    "message": "Excepción creada exitosamente",
    "id": 1
  }  
  ```
  **Errores posibles**
    - 401 No autenticado o sin permisos.
    - 400 Campos obligatorios faltantes o inválidos.

  ---

- **GET /api/v1/schedule/getException**  
  Obtiene todas las excepciones de horario.  
  **Respuesta exitosa:**
  ```json  
  [
      {
          "id_exception": 1,
          "fecha_excepcion": "2025-11-02",
          "hora_apertura": "10:00:00",
          "hora_cierre": "17:00:00",
          "is_closed": 1,
          "descripcion": "Dia de los Santos"
      }
  ]
  ```
  **Errores posibles**
    - 401 No autenticado o sin permisos.
    - 404 No se encontraron excepciones.
  ---

- **DELETE /api/v1/schedule/deleteException/:id**  
  Elimina una excepción de horario por su ID.
  **Respuesta exitosa:**  
  ```json  
  {
    "message": "Excepción eliminada exitosamente"
  }  
  ```
  **Errores posibles**
    - 401 No autenticado o sin permisos.
    - 404 No se encontró la excepción.

### Verificación de Horario y Excepciones
- **GET /api/v1/schedule/isOpen**  
  Verifica si la cafetería está abierta en la fecha y hora actuales, considerando horarios y excepciones.  
  **Respuesta exitosa:**  
  ```json  
  [
      {
          "is_closed": 1,
          "mensaje": "Cerrado (horario no laboral)",
          "descripcion": null,
          "hora_apertura_vigente": "06:00:00",
          "hora_cierre_vigente": "17:00:00"
      }
  ]
  ```
  **Errores posibles**
    - 401 No autenticado o sin permisos.
    - 500 Error al verificar horarios y excepciones.