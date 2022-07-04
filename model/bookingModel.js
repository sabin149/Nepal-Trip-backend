const mongoose = require("mongoose")
const bookingSchema = new mongoose.Schema({
    room: {
        type: mongoose.Types.ObjectId, ref: "room"
    },
    user: { type: mongoose.Types.ObjectId, ref: 'user' },
    hotel: {
        type: mongoose.Types.ObjectId, ref: "hotel"
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,

    },
    total_amount: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10,
    },
    address: {
        type: String,
        required: true,
    },
    request: {
        type: Array
    },
    tc: {
        type: Boolean,
        required: true,
    },
    payment_id: {
        type: String,
        required: true,
    },
    payment_type: {
        type: String,
        required: true,
    },
    children: {
        type: Number
    },
    adults: {
        type: Number
    },
    rooms:{
        type: Number
    }
},
    {
        timestamps: true,
    }
)
module.exports = mongoose.model("booking", bookingSchema)

