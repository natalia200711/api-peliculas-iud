
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors());

// Registrar las Rutas de la API (Endpoints requeridos)
app.use('/api/genero', require('./routes/genero'));
app.use('/api/director', require('./routes/director'));
app.use('/api/productora', require('./routes/productora'));
app.use('/api/tipo', require('./routes/tipo'));
app.use('/api/media', require('./routes/media'));

// Conexión a MongoDB Atlas e inicio del servidor
const iniciarServidor = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI;

        if (!MONGO_URI) {
            throw new Error('No se encontró MONGO_URI en el archivo .env');
        }

        await mongoose.connect(MONGO_URI);

        console.log('Base de datos conectada exitosamente a MongoDB Atlas');

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
        });

    } catch (err) {
        console.error('Error al conectar la base de datos:', err);
        process.exit(1);
    }
};

iniciarServidor();
