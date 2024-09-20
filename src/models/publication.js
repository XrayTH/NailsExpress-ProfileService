const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
    profesionalEmail: { type: String, required: true },
    listaPublicaciones: [
        {
            titulo: { type: String, required: true },
            contenido: { type: String, required: true },
            imagen: { type: String }
        }
    ],
    activo: { type: Boolean, default: true } // Atributo activo
});

module.exports = mongoose.model('Publication', publicationSchema);

