const express = require('express');
const router = express.Router();
const publicationController = require('../controllers/publicationController');

// Rutas
router.get('/', publicationController.getAllPublications);
router.get('/:email', publicationController.getPublicationsByEmail);
router.post('/:email', publicationController.createPublication);
router.delete('/:email', publicationController.deletePublications);
router.post('/:email/publicaciones', publicationController.addPublication);
router.delete('/:email/publicaciones/:index', publicationController.removePublication);
router.put('/:email/publicaciones/:index', publicationController.updatePublication);
router.patch('/:email/activo', publicationController.toggleActiveStatus);

module.exports = router;
