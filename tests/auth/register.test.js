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
    it('Test for Register User', () => {
        const register = {
            "fullname": "Sabin52 Dangal52",
            "username": "sabin522",
            "email": "sabin521@gmail.com",
            "password": "123456",
            "gender": "Male",
            "phone":"9858789415"
        };
        return User.create(register)
            .then((res) => {
                expect(res.email).toEqual('sabin521@gmail.com');
            });
    });
});
