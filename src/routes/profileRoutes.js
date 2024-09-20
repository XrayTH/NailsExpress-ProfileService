const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.post('/', profileController.createProfile);
router.get('/', profileController.getAllProfiles);
router.get('/:email', profileController.getProfileByEmail);
router.post('/:email/addService', profileController.addService);
router.delete('/:email/removeService/:index', profileController.removeService);
router.put('/:email', profileController.updateProfile);
router.delete('/:email', profileController.deleteProfile);
router.patch('/:email/toggle-active', profileController.toggleActiveStatus);

module.exports = router;
