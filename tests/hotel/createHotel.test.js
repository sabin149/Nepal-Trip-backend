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
    it('Test for Create Hotel', () => {
        const createBooking = {
            "hotel_name": "Hotel Annapurna",
            "address": "lumbini",
            "phone": "9841247728",
            "hotel_email": "hotelannapurna@gmail.com",
            "pan_no": "78899838",
            "price": "5250",
            "hotel_images": [
                "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
                "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80"
            ],
            "hotel_info": "this hotel is damn good",
            "hotel_facilities": ["good", "noice"],
            "hotel_policies": ["no smoking", "no drugs"],
            "rating": "2"
        };
        return Hotel.create(createBooking)
            .then((res) => {
                expect(res.pan_no).toEqual('78899838');
            });
    });
});
