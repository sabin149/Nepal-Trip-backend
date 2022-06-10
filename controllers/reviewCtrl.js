const Review = require('../model/reviewModel');
const Hotel = require('../model/hotelModel');
const { APIfeatures } = require('../lib/features');

const reviewCtrl = {
    updateReview: async (req, res) => {
        try {
            const { review, hotel_rating } = req.body;

            if (!review)
                return res.status(400).json({ status: "failed", msg: "Please add the review" })

            const newReview = await Review.findOneAndUpdate({
                _id: req.params.id,
                user: req.user._id

            }, { review, hotel_rating }, { new: true });

            res.json({
                status: "success", msg: 'Review updated successfully',
                newReview: {
                    ...newReview._doc
                }
            });
        } catch (error) {
            res.status(500).json({ status: "failed", msg: error.message });
        }

    }
}
module.exports = reviewCtrl;