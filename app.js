const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path'); 


require('dotenv').config();

const authRoutes = require('./routes/authRouters');
const userRoutes = require('./routes/userRouters');
const orderRoutes = require('./routes/orderRouters');
const productRoutes = require('./routes/productsRouters');
const categoryRoutes = require('./routes/categoriesRouters'); 
const uploadRouter = require('./routes/uploadRouter'); 
const favoritesRouters = require('./routes/favoritesRouters');
const scheduleRouters = require('./routes/scheduleRouters');
const reportsRouters = require('./routes/reportsRouters');



const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'public')));


// Middlewares
app.use(cors({
  origin: "http://localhost:8081",
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // para recibir forms

// Rutas
app.get('/', (req, res) => {
  res.send('¡Bienvenido al servidor backend Cafeteria!');
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/uploads', uploadRouter);
app.use('/api/v1/favorites', favoritesRouters);
app.use('/api/v1/schedule', scheduleRouters);
app.use('/api/v1/reports', reportsRouters);




app.listen(port, () => {
  console.log(`Servidor backend Cafeteria escuchando en http://localhost:${port}`);
});