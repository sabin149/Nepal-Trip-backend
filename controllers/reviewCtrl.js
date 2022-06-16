const Review = require('../model/reviewModel');
const Hotel = require('../model/hotelModel');
const { APIfeatures } = require('../lib/features');

const reviewCtrl = {
    createRating: async (req, res) => {
        try {
            const { hotelId, hotel_rating, hotelUserId } = req.body;
            if (hotel_rating > 5 || hotel_rating < 1)
                return res.status(400).json({ status: "failed", msg: "Please add valid rating" })
            const hotelReview = await Review.findOne({ hotelId, hotelUserId, user: req.user._id });
            if (hotelReview) {
                const newReview = await Review.findOneAndUpdate(
                    { _id: hotelReview._id },
                    { hotel_rating },
                    { new: true }
                );
                res.json({
                    status: "success", msg: 'Rating added', newReview
                });
            }
            if (!hotelReview) {
                const review = new Review({
                    user: req.user._id,
                    hotel_rating,
                    hotelId,
                    hotelUserId
                })
                await review.save();
                await Hotel.findOneAndUpdate(
                    {
                        _id: review.hotelId
                    },
                    { $push: { hotel_reviews: review._id } })
                res.json({
                    status: "success", msg: 'Rating added', newReview: review
                });
            }
        } catch (error) {
            res.status(500).json({ status: "failed", msg: error.message });
        }
    }
}
module.exports = reviewCtrl;

