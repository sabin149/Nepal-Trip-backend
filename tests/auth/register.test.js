const User = require('../../model/userModel');
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

describe('Test for User Schema', () => {
    // the code below is for insert testing
    it('Test for Register User', () => {
        const register = {
            "fullname": "Sabin Dangal",
            "username": "sabin",
            "email": "sabin@gmail.com",
            "password": "123456",
            "gender": "Male",
            "phone":"9858789425"
        };
        return User.create(register)
            .then((res) => {
                expect(res.email).toEqual('sabin@gmail.com');
            });
    });

});
