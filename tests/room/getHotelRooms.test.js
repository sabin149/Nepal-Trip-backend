const Rooms = require('../../models/roomModel');
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
    it('Test for get Hotel Rooms',async () => {
        const room = await Rooms.findOne({"_id":"6207ec775f69106131688a13"});
        expect(room.ok);
    });

});
