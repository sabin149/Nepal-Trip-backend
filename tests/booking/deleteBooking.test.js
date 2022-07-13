const Bookings = require('../../model/bookingModel');
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

describe('Test for Booking Schema', () => {
    // the code below is for insert testing
    it('Test for delete Booking',async () => {
        const booking = await Bookings.findByIdAndDelete(
            "62dd743a58a1651e8319786f"
    );
        expect(booking.ok);

    });

});
