const Rooms = require('../../model/roomModel');
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
        const createRoom = {
            "hotelId":"62a34ee641ea5ffacd6e018d",
            "room_type":"deluxe",
            "room_price":"1609",
            "room_options":["nice","good"],
            "room_images":["https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg", "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80"],
            "room_facilities":["good","noice"],
            "hotelUserId":"62a2ea502366fe8c533c2b6c"}
        return Rooms.create(createRoom)
            .then((res) => {
                expect(res.room_type).toEqual('deluxe');
            });
    });

});

