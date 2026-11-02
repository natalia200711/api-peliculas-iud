const { Schema, model } = require('mongoose');

const ProductoraSchema = Schema({
    nombreProductora: { type: String, required: true },
    estado: { type: String, enum: ['Activo', 'Inactivo'], required: true },
    fechaCreacion: { type: Date, default: Date.now },
    fechaActualizacion: { type: Date, default: Date.now },
    slogan: { type: String, required: true },
    descripcion: { type: String, required: true }
});

module.exports = model('Productora', ProductoraSchema);