const express = require('express');
const app = express();
require('dotenv').config();


const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('¡Bienvenido al servidor backend Cafeteria!');
});

app.listen(port, () => {
  console.log(`Servidor backend Cafeteria escuchando en http://localhost:${port}`);
});