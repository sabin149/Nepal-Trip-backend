const mongoose = require("mongoose")
const hotelSchema = new mongoose.Schema({
    hotel_name: {
        type: String,
        required: true,
    },
    rating:{
        type:Number,
        required:true,
    },
    address: {
        type: String,
        required: true,
    },
    hotel_email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        maxlength: 10,
        minlength: 10,
        required: true
    }, pan_no: {
        type: Number,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    hotel_images: {
        type: Array,
        required: true
    },
    hotel_info: {
        type: String,
        required: true,
    },
    hotel_facilities: {
        type: Array,
        required: true
    },
    hotel_policies: {
        type: Array,
        required: true
    },
    hotel_reviews: [{ type: mongoose.Types.ObjectId, ref: 'review' }],
    rooms: [{ type: mongoose.Types.ObjectId, ref: 'room' }],
    hotel_validity: {
        type: Boolean,
        default: false
    },
    user: { type: mongoose.Types.ObjectId, ref: 'user' }
},
    {
        timestamps: true
    });
hotelSchema.index({ hotel_name: "text" })
const Hotels = mongoose.model("hotel", hotelSchema)
Hotels.createIndexes({ hotel_name: "text" })
module.exports = Hotels