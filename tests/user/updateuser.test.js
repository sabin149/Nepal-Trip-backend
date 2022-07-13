const User = require('../../model/userModel');
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
describe('Test for User Schema', () => {
    // the code below is for insert testing
    it('Test for Update User', () => {
        return User.findByIdAndUpdate(
            "627aa4677c202ca65ae2a7b7",
            {
                $set: {
                    username: "sabin1",
                }
            }
        ).then((res) => {
            expect(res.ok);
        })
    });
});

