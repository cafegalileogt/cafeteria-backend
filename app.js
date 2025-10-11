const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

require('dotenv').config();
const authRoutes = require('./routes/authRouters');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('¡Bienvenido al servidor backend Cafeteria!');
});

app.use('/api/v1/auth', authRoutes);


app.listen(port, () => {
  console.log(`Servidor backend Cafeteria escuchando en http://localhost:${port}`);
});