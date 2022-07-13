const Rooms = require('../../models/roomModel');
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
describe('Test for Room Schema', () => {
    return Rooms.findOneAndUpdate({
        _id:Object("6208b423237fcf48b51b2cae")
    },
        {
            $set: {
                room_type: "family room",
            }
        }
    ).then((res) => {
        expect(res.content).toEqual("family room");
    })

});

