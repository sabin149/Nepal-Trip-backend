// all room models are included here

const mongoose = require("mongoose")
const roomSchema = new mongoose.Schema({
    room_type:{
        type: String,
        required: true,
    },
    room_price:{
        type: Number,
        required: true,
    },
    room_options:{
        type: Array,
        required: true,
    },
    room_images:{   
        type: Array,
        required: true, 
    },
    room_facilities:{
        type: Array,
        required: true,
    },
    user: { type: mongoose.Types.ObjectId, ref: 'user' },
    hotelId:{type: mongoose.Types.ObjectId, ref: 'hotel'},
    hotelUserId:mongoose.Types.ObjectId,
},{
    timestamps: true
})
module.exports = mongoose.model("room", roomSchema)