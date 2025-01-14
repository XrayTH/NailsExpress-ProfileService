const Review = require('../models/review');

// Obtener todas las colecciones de reseñas
exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find(); // Obtiene toda la colección
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las reseñas', error });
    }
};

// Obtener todas las reseñas de un profesional por su email
exports.getReviewsByEmail = async (req, res) => {
    try {
        const { email } = req.params; // Obtener el email de los parámetros de la URL

        // Buscar las reseñas asociadas al email del profesional
        const review = await Review.findOne({ profesionalEmail: email });

        if (!review) return res.status(404).json({ message: 'Perfil no encontrado' });

        // Si se encuentran reseñas, las devolvemos
        res.status(200).json(review.listaReseñas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las reseñas', error });
    }
};

// Crear nuevas reseñas con una lista vacía
exports.createReview = async (req, res) => {
    try {
        const { email } = req.params; // Obtener el email de los parámetros de la URL

        const newReview = new Review({
            profesionalEmail: email,
            listaReseñas: [] // Inicializa la lista de reseñas como vacía
        });

        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la reseña', error });
    }
};

// Añadir una nueva reseña a la lista
exports.addReview = async (req, res) => {
    try {
        const { email } = req.params; // Obtener el email de los parámetros de la URL
        const { usuarioCliente, contenido, calificación } = req.body; // Obtener los datos de la reseña

        const updatedReview = await Review.findOneAndUpdate(
            { profesionalEmail: email },
            { $push: { listaReseñas: { usuarioCliente, contenido, calificación } } },
            { new: true }
        );

        if (!updatedReview) return res.status(404).json({ message: 'Perfil no encontrado' });
        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(500).json({ message: 'Error al añadir la reseña', error });
    }
};

// Borrar una reseña de la lista
exports.deleteReview = async (req, res) => {
    try {
        const { email, index } = req.params; // Obtener el email y el índice de los parámetros de la URL

        const review = await Review.findOne({ profesionalEmail: email });
        if (!review) return res.status(404).json({ message: 'Perfil no encontrado' });

        // Verifica que el índice esté dentro del rango
        if (index < 0 || index >= review.listaReseñas.length) {
            return res.status(400).json({ message: 'Índice fuera de rango' });
        }

        // Borrar la reseña usando el índice
        review.listaReseñas.splice(index, 1);
        await review.save();

        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la reseña', error });
    }
};


// Calcular el promedio de calificaciones
exports.getAverageRating = async (req, res) => {
    try {
        const { email } = req.params; // Obtener el email de los parámetros de la URL
        const review = await Review.findOne({ profesionalEmail: email });

        if (!review) return res.status(404).json({ message: 'Perfil no encontrado' });

        const totalCalificaciones = review.listaReseñas.reduce((acc, reseña) => acc + reseña.calificación, 0);
        const promedio = totalCalificaciones / review.listaReseñas.length || 0; // Evitar dividir por cero

        res.status(200).json({ promedio });
    } catch (error) {
        res.status(500).json({ message: 'Error al calcular el promedio', error });
    }
};

// Cambiar estado activo
exports.toggleActiveStatus = async (req, res) => {
    try {
        const { email } = req.params; // Obtener el email de los parámetros de la URL
        const review = await Review.findOne({ profesionalEmail: email });

        if (!review) return res.status(404).json({ message: 'Perfil no encontrado' });

        // Cambiar el estado activo
        review.activo = !review.activo;
        await review.save();

        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: 'Error al cambiar el estado activo', error });
    }
};


