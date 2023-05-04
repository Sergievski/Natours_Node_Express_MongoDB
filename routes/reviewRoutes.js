const express = require('express');
const tourController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/').get(tourController.getAllReviews);

module.exports = router;
