const User = require('../../models/userModel');
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

describe('Test for User Schema', () => {
    // the code below is for insert testing
    it('Test for Update User', () => {
        return User.findOneAndUpdate({
            _id:Object("6207ec775f69106131688a13")
        },
            {
                $set: {
                    username: "sabin",
                }
            }
        ).then((res) => {
            expect(res.username).toEqual("sabin");
        })

    });

});
