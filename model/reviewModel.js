const mongoose = require("mongoose")



const reviewSchema = new mongoose.Schema({

    review: {

        type: String,

        // required: true,

    },

    hotel_rating: {

        type: Number,

        // enum: ['0', '1', "2", '3', '4', '5'],

        // default: '0'

        min:1,

        max:5,

        default:0

    },

    tag: Object,

    reply: mongoose.Types.ObjectId,

    likes: [{ type: mongoose.Types.ObjectId, ref: 'user' }],

    user: { type: mongoose.Types.ObjectId, ref: 'user' },

    hotelId: mongoose.Types.ObjectId,

    hotelUserId: mongoose.Types.ObjectId,

},

    {

        timestamps: true

    })



module.exports = mongoose.model("review", reviewSchema)