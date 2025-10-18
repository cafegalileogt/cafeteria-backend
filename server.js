const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./config/db');
const authRouters = require('./routes/authRouters');
const productRouters = require('./routes/productRouters'); // 👈 agregado

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRouters);
app.use('/api/v1/products', productRouters); // 👈 nueva ruta

app.get('/', (req, res) => {
  res.send('✅ Servidor backend Cafeteria funcionando correctamente.');
});

app.listen(port, () => {
  console.log(`🚀 Servidor backend Cafeteria escuchando en http://localhost:${port}`);
});
