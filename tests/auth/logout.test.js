const mongoose = require('mongoose');

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
        it('Test for Logout User',async (req,res) => {
        const status = await res.clearCookie('refreshtoken', { path: '/api/refresh_token' })
                expect(status.ok); 
    })

})