require("dotenv").config();
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        // type: 'OAuth2',
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        // clientId: process.env.AUTH_CLIENT_ID,
        // clientSecret: process.env.AUTH_CLIENT_SECRET,
        // refreshToken: process.env.AUTH_REFRESH_TOKEN
    },
});
transporter.verify((err, success) => {
    if (err) console.error(err);
   else {console.log('Nodemailer config is correct: '+success);
}});
 

 module.exports=transporter; 