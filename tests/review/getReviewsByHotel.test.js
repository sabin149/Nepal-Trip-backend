const Reviews = require('../../models/reviewModel');
const mongoose = require('mongoose');

// use the new name of the database
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
    // the code below is for insert testing
    it('Test for get Review by hotel',async () => {
        const review = await Reviews.find({
            _id:"62a9af98affa11d32ad6acce"
        });
        expect(review.ok);
    });

});
