const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.get('/', reviewController.getAllReviews);
router.post('/:email', reviewController.createReview);
router.post('/:email/reviews', reviewController.addReview);
router.get('/:email/promedio', reviewController.getAverageRating);
router.delete('/:email/reviews/:index', reviewController.deleteReview);
router.patch('/:email/activo', reviewController.toggleActiveStatus);

module.exports = router;
