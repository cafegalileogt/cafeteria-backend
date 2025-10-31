### Documentación de Endpoints - Reportes

### Reportes

- **GET /api/v1/reports/getAllSalesByDates**
    Obtiene las ventas total y detalladas por día en un rango de fechas para usuarios con roles 2 y 3.
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
    Obtiene los 10 productos más vendidos en un rango de fechas para usuarios con roles 2 y 3.
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