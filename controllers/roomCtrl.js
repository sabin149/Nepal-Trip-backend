const Room = require('../model/roomModel');
const roomCtrl = {
    addRoom: async (req, res) => {
        try {
            const {
                room_type, room_price, room_options, room_images, room_facilities, hotelId, hotelUserId
            } = req.body;
            if (!room_type)
                return res.status(400).json({ msg: "Please enter a valid room type." })
            if (!room_price)
                return res.status(400).json({ msg: "Please enter a valid room price." })
            if (!hotelId)
                return res.status(400).json({ msg: "Please enter a valid hotel id." })
            if (!hotelUserId)
                return res.status(400).json({ msg: "Please enter a valid hotel user id." })
            if (room_images.length === 0)
                return res.status(400).json({ msg: "Please add your room images." })
            if (room_facilities.length === 0)
                return res.status(400).json({ msg: "Please add your room facilities." })
            if (room_options.length === 0)
                return res.status(400).json({ msg: "Please add your room options." })
            const newRoom = new Room({
                room_type, room_price, room_options, room_images, room_facilities, user:req.user._id, hotelId, hotelUserId
            });

            await newRoom.save();
            res.json({
                status: 'success',
                msg: 'ROom Created!',
                newRoom: {
                    ...newRoom._doc,
                    user: req.user
                }
            })
        }
        catch (error) {
            return res.status(500).json({ status: "failed", msg: error.message })
        }
    }
}

module.exports = roomCtrl;