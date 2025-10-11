const express = require('express');
const app = express();

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

require('dotenv').config();
const authRoutes = require('./routes/authRouters');
const userRoutes = require('./routes/userRouters');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.send('¡Bienvenido al servidor backend Cafeteria!');
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);


app.listen(port, () => {
  console.log(`Servidor backend Cafeteria escuchando en http://localhost:${port}`);
});