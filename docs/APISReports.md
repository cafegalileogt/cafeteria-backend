### Documentación de Endpoints - Reportes

### Reportes

- **GET /api/v1/reports/getAllOrdersByDates**
    Obtiene todas las órdenes en un rango de fechas 
    Parámetros query:
    from (string, obligatorio): Fecha de inicio en formato YYYY-MM-DD
    to (string, obligatorio): Fecha fin en formato YYYY-MM-DD

    **Respuesta exitosa:**
    ```json
    {
        "from": "2025-10-30",
        "to": "2025-10-30",
        "orders": [
            {
                "numero_orden": 100544,
                "id_usuario": 1,
                "correo_institucional": "byron.ramirez@galileo.edu",
                "fecha": "2025-10-31T04:00:00.000Z",
                "estado": "En preparación",
                "total": "40.23",
                "id_personal": 1
            },
            {
                "numero_orden": 213448,
                "id_usuario": 1,
                "correo_institucional": "byron.ramirez@galileo.edu",
                "fecha": "2025-10-31T03:05:32.000Z",
                "estado": "En preparación",
                "total": "50.12",
                "id_personal": 1
            },
            {
                "numero_orden": 221544,
                "id_usuario": 1,
                "correo_institucional": "byron.ramirez@galileo.edu",
                "fecha": "2025-10-31T03:03:09.000Z",
                "estado": "En preparación",
                "total": "80.00",
                "id_personal": 1
            },
            {
                "numero_orden": 233455,
                "id_usuario": 1,
                "correo_institucional": "byron.ramirez@galileo.edu",
                "fecha": "2025-10-31T03:05:32.000Z",
                "estado": "En preparación",
                "total": "100.00",
                "id_personal": 1
            }
        ]
    }
    ```
    **Errores posibles:**
    - 400 Parámetros from o to faltantes o inválidos
    - 401 No autenticado o sin permisos
    - 404 No hay órdenes en el rango solicitado
    - 500 Error interno del servidor

---

- **GET /api/v1/reports/getPeakHours**
    Obtiene las horas pico de órdenes en un rango de fechas
    Parámetros query:
    from (string, obligatorio): Fecha de inicio en formato YYYY-MM-DD
    to (string, obligatorio): Fecha fin en formato YYYY-MM-DD
    **Respuesta exitosa:**
    ```json
    {
        "from": "2025-10-29",
        "to": "2025-10-31",
        "horas_pico": [
            {
                "hour": "21:00",
                "orders": 3
            },
            {
                "hour": "22:00",
                "orders": 1
            }
        ],
        "most_active_hour": "21:00"
    }
    ```
    **Errores posibles:**
    - 401 No autenticado o sin permisos
    - 500 Error interno del servidor

---
- **GET /api/v1/reports/getAllSalesByDates**
    Obtiene las ventas total y detalladas por día en un rango de fechas.
    Parámetros query:
    from (string, obligatorio): Fecha de inicio en formato YYYY-MM-DD
    to (string, obligatorio): Fecha fin en formato YYYY-MM-DD

    **Respuesta exitosa:**
    ```json
    {
    "from": "2025-10-01",
    "to": "2025-10-31",
    "total_sales": "15625.75",
    "daily_sales": [
        { "date": "2025-10-01", "orders": 35, "total": "980.50" },
        { "date": "2025-10-02", "orders": 28, "total": "820.75" }
        /* más días */
    ]
    }
    ```
    **Errores posibles:**
    - 400 Parámetros from o to faltantes o inválidos
    - 401 No autenticado o sin permisos
    - 404 No hay ventas en el rango solicitado
    - 500 Error interno del servidor


---
- **GET /api/v1/reports/getTopTenProductsByDates**
    Obtiene los 10 productos más vendidos en un rango de fechas.
    Parámetros query:
    from (string, obligatorio): Fecha de inicio en formato YYYY-MM-DD
    to (string, obligatorio): Fecha fin en formato YYYY-MM-DD
    **Respuesta exitosa:**
    ```json
    {
    "from": "2025-10-01",
    "to": "2025-10-31",
    "top_products": [
        { "id_producto": 1, "name": "torito", "sold_times": 130, "total": "1950.00" },
        { "id_producto": 2, "name": "Panqueques", "sold_times": 98, "total": "1470.00" }
        /* más productos */
    ]
    }
    ```
    **Errores posibles:**
    - 400 Parámetros from o to faltantes o inválidos
    - 401 No autenticado o sin permisos
    - 404 No hay productos vendidos en el rango solicitado
    - 500 Error interno del servidor