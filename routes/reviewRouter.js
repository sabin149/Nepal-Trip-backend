const router = require('express').Router();
const reviewCtrl = require('../controllers/reviewCtrl');
const auth = require('../middleware/auth');

router.patch("/rating", auth, reviewCtrl.createRating)
router.post("/review", auth, reviewCtrl.createReview)
router.get('/review', reviewCtrl.getReviews);
router.get('/review/:id',reviewCtrl.getReviewsByHotel);
router.patch("/review/:id", auth, reviewCtrl.updateReview)
router.delete("/review/:id", auth, reviewCtrl.deleteReview)
router.patch("/review/:id/like", auth, reviewCtrl.likeReview)
router.patch("/review/:id/unLike", auth, reviewCtrl.unLikeReview)

module.exports = router;
