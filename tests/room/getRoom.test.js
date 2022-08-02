const Rooms = require('../../model/roomModel');
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

describe('Test for Room Schema', () => {
    // the code below is for insert testing
    it('Test for get Rooms',async () => {
        const room = await Rooms.findOne({"_id":"62a87412b3a08b8d4aad5f1c"});
        expect(room.ok);
    });

});

