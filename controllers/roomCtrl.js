const Room = require('../model/roomModel');
const Hotel = require('../model/hotelModel');
const roomCtrl = {
    createHotelRoom: async (req, res) => {
        try {
            const { hotelId, room_type, room_price, room_options, room_images, room_facilities, hotelUserId } = req.body

            if (hotelId && room_type && room_price && room_options && room_facilities) {
                if (room_images.length === 0)
                    return res.status(400).json({ msg: "Please add your room images." })

                const hotel = await Hotel.findById(hotelId)
                if (!hotel)
                    return res.status(400).json({ status: "failed", msg: "Hotel not found." })

                const newRoom = new Room({
                    user: req.user._id,
                    hotelId,
                    room_type,
                    room_price,
                    room_options,
                    room_images,
                    room_facilities,
                    hotelUserId
                })

                await Hotel.findOneAndUpdate({
                    _id: hotelId,
                },
                    {
                        $push: {
                            rooms: newRoom._id
                        }
                    }, { new: true })

                await newRoom.save()

                res.json({
                    status: 'success',
                    msg: 'Room Created!',
                    newRoom: {
                        ...newRoom._doc,
                    }
                })

            } else {
                return res.status(400).json({ status: "failed", msg: "Please fill all the fields." })
            }
        } catch (error) {
            return res.status(500).json({ status: "failed", msg: error.message })
        }
    },
    getHotelRooms: async (req, res) => {
        try {
            const hotelId=(await Hotel.findById(req.params.id).select("_id"));
            console.log(hotelId);
            const rooms = await Room.findOne({hotelId})
            console.log(rooms);

        } catch (error) {
            return res.status(500).json({ status: "failed", msg: error.message })
        }
    },
    getHotelRoom: async (req, res) => {
        try {
            const room = await Room.findById(req.params.id);
            res.json({ status: 'success', room });
        } catch (error) {
            return res.status(500).json({ status: "failed", msg: error.message })
        }
    },
}

module.exports = roomCtrl;