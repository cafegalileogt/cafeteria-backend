# Cafeteria Backend

Este proyecto es un servidor backend para una cafetería, desarrollado con Node.js y Express.

## Requisitos
- Node.js (v14 o superior)
- npm (gestor de paquetes de Node.js)

## Instalación
1. Clona el repositorio o descarga los archivos en tu máquina local.
2. Abre una terminal en la carpeta del proyecto.
3. Instala las dependencias:
   ```powershell
   npm install
   ```

## Ejecución
Puedes iniciar el servidor con el siguiente comando:
```powershell
node app.js
```

Por defecto, el servidor se ejecuta en el puerto 3000. Si deseas usar otro puerto, puedes definir la variable de entorno `PORT`:
```powershell
$env:PORT=4000; node app.js
```

## Uso
Accede a la URL:
```
http://localhost:3000/
```
O al puerto que hayas definido.

## Estructura del proyecto
- `app.js`: Archivo principal del servidor.
- `routes/`: Carpeta para las rutas de la API.
- `package.json`: Dependencias y scripts del proyecto.

## Créditos
Desarrollado por Grupo 1.
