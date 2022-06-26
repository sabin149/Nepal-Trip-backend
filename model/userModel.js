// all user models are included here

const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25
    },
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25,
        unique: true
    }, gender: {
        type: String,
        enum : ['Male',"Female",'Other'],
        default:"Male"

    }, address: {
        type: String, default: '',
    },
    phone: {
        type: Number,
        maxlength:10,
        minlength:10,
        required: true
    }, email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }, password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/sabin149/image/upload/v1644998344/avatar/avatar_vhonwz.png'
    },
    favourites: [{ type: mongoose.Types.ObjectId, ref: 'hotel' }],
    role: {
        type: String,
        enum : ['user',"vendor",'admin'],
        default: 'user',
    },
},
    {
        timestamps: true
    });

userSchema.index({ username: "text" })
const Users = mongoose.model("user", userSchema)
Users.createIndexes({ username: "text" })
module.exports = Users