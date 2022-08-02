const Reviews = require('../../model/reviewModel');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/nepaltriptest';
beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});
afterAll(async () => {
    await mongoose.connection.close();
});
describe('Test for Review Schema', () => {
    it('Test for Create Review', () => {
        const createRating = {
            "hotelId":"62e7de137036bfc9d9e76d76",
            "review":"nice hotel",
            "hotel_rating":"5",
            "hotelUserId":"62a1f010ede3f37e526eea79"
        }

        return Reviews.create(createRating)
            .then((res) => {
                expect(res.review).toEqual('nice hotel');
            });
    });
});
