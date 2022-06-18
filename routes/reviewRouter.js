const router = require('express').Router();
const reviewCtrl = require('../controllers/reviewCtrl');
const auth = require('../middleware/auth');

router.patch("/rating", auth, reviewCtrl.createRating)

module.exports = router;
