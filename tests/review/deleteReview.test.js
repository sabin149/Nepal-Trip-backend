const Reviews = require('../../model/reviewModel');
const mongoose = require('mongoose');

// use the new name of the database
const url = 'mongodb://localhost:27017/test_nepaltrip';

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
    it('Test for Deleting Single Review',async () => {
        const review = await Reviews.findByIdAndDelete("6207ec775f69106131688a13");
        expect(review.ok);
    });

});
