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
    it('Test for Login User', () => {
        const login = {
            "email": "sabin52@gmail.com",
            "password": "123456",
        };
        return User.find(login)
            .then((res) => {
                expect(res[0].email).toEqual('sabin52@gmail.com');
            });
    });
});
