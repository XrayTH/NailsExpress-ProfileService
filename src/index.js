const express = require('express');
const connectDB = require('./config/db'); // Importa el archivo de conexión a la base de datos
const profileRoutes = require('./routes/profileRoutes');
const publicationRoutes = require('./routes/publicationRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

require('dotenv').config(); // Asegúrate de cargar las variables de entorno

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Rutas
app.use('/profileService/perfiles', profileRoutes);
app.use('/profileService/publicaciones', publicationRoutes);
app.use('/profileService/reseñas', reviewRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
