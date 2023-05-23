const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.get('/', viewsController.getOverview);
router.get('/tour/:slug', viewsController.getTour);

router.get('/tour', (req, res) => {
  res.status(200).render('tour', {
    title: 'The forest hiker tour',
  });
});

module.exports = router;
