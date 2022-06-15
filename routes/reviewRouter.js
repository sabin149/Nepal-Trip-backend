const router = require('express').Router();
const reviewCtrl = require('../controllers/reviewCtrl');
const auth = require('../middleware/auth');


router.patch("/review/:id", auth, reviewCtrl.updateReview)

module.exports = router;
