const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    profesionalEmail: { type: String, required: true },
    listaReseñas: [
        {
            usuarioCliente: { type: String, required: true },
            contenido: { type: String, required: true },
            calificación: { type: Number, required: true, min: 1, max: 5 }
        }
    ],
    activo: { type: Boolean, default: true } // Atributo activo
});

module.exports = mongoose.model('Review', reviewSchema);


