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
    },
    createReview: async (req, res) => {
        try {
            const { hotelId, review, tag, reply, hotelUserId } = req.body;
            const hotel = await Hotel.findById(hotelId);
            if (!hotel)
                return res.status(404).json({ status: "failed", msg: 'Hotel not found' });
            if (reply) {
                const review = await Review.findById(reply);
                if (!review)
                    return res.status(404).json({ status: "failed", msg: 'Review not found' });
            }
            const newReview = new Review({
                user: req.user._id,
                review,
                tag,
                reply,
                hotelId,
                hotelUserId
            })
            await Hotel.findOneAndUpdate(
                { _id: hotelId },
                { $push: { hotel_reviews: newReview._id } },
                { new: true }
            );
            await newReview.save();
            res.json({ status: "success", msg: 'Review created successfully', newReview });
        } catch (error) {
            res.status(500).json({ status: "failed", msg: error.message });
        }
    }
}
module.exports = reviewCtrl;

