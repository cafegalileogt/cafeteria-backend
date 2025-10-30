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