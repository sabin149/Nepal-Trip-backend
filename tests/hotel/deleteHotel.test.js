const Hotel = require('../../model/hotelModel');
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

describe('Test for Hotel Schema', () => {

    it('Test for delete Hotel',async () => {
        const hotel = await Hotel.findByIdAndDelete(
            "62e7de76768a876cc797bf80"
    );
        expect(hotel.ok);

    });

});
