const router = require('express').Router();
const reviewCtrl = require('../controllers/reviewCtrl');
const auth = require('../middleware/auth');

router.patch("/rating", auth, reviewCtrl.createRating)
router.post("/review", auth, reviewCtrl.createReview)
router.get('/review', auth, reviewCtrl.getReviews);
router.get('/review/:id', reviewCtrl.getReviewsByHotel);

module.exports = router;
