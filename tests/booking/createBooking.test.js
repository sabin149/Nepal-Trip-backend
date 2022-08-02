const Bookings = require('../../model/bookingModel');
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
describe('Test for Booking Schema', () => {
    it('Test for Create Booking', () => {
        const createBooking = {
            "room": "62a1f0bcede3f37e526eea8f", "hotel": "62a1f099ede3f37e526eea81",
            "start_date": "2022-06-15T00:00:00.000+00:00","end_date": "2022-06-18T00:00:00.000+00:00",
            "total_amount": "5000", "name": "Sabin Dangal","email": "dangalsabin2025@gmail.com",
            "phone": "9841247730", "address": "ktm","request": ["wifi", "24checkin"], "tc": true,
            "payment_id": "789456123", "payment_type": "Khalti"
        };
        return Bookings.create(createBooking)
            .then((res) => {
                expect(res.phone).toEqual('9841247730');
            });
    });
});
