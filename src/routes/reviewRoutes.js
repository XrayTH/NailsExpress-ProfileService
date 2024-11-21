const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Crear nuevas reseñas
router.post('/:email', reviewController.createReview);

// Añadir una nueva reseña a la lista
router.post('/:email/reviews', reviewController.addReview);

// Obtener el promedio de calificaciones
router.get('/:email/promedio', reviewController.getAverageRating);

// Borrar una reseña de la lista
router.delete('/:email/reviews/:index', reviewController.deleteReview);

// Cambiar estado activo
router.patch('/:email/activo', reviewController.toggleActiveStatus);

router.patch('/:email/toggle-active', reviewController.toggleActiveStatus);

module.exports = router;
