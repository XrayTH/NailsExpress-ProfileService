const mongoose = require('mongoose');

const ubicacionSchema = new mongoose.Schema({
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
});

const profileSchema = new mongoose.Schema({
    profesionalEmail: { type: String, required: true, unique: true },
    titulo: { type: String, required: true },
    descripción: { type: String, required: true },
    dirección: { type: String, required: true },
    imagen: { type: String },
    portada: { type: String },
    servicios: { type: [String], default: [] },
    ubicación: { type: ubicacionSchema, required: true },
    activo: { type: Boolean, default: true } // Nuevo atributo
});

module.exports = mongoose.model('Profile', profileSchema);

