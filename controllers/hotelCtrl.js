const Hotel = require('../model/hotelModel');
const { APIfeatures } = require('../lib/features');
const hotelCtrl = {

    getHotels: async (req, res) => {
        try {
            const features = new APIfeatures(Hotel.find(), req.query).paginating().sorting().searching().filtering();

            const result = await Promise.allSettled([
                features.query,
                Hotel.countDocuments() // count number of hotels
            ])

            const hotels = result[0].status === "fulfilled" ? result[0].value : [];
            const count = result[1].status === "fulfilled" ? result[1].value : 0;
            // const hotels = await Hotel.find();
            res.json({ status: 'success', count, hotels });
        } catch (error) {
            return res.status(500).json({ status: "failed", msg: error.message })
        }
    },
    createHotel: async (req, res) => {
        try {
            const {
                hotel_name, address, phone, hotel_email, pan_no, price, hotel_images, hotel_info, hotel_facilities, hotel_policies
            } = req.body
            if (hotel_name && address && phone && pan_no && hotel_info && hotel_facilities && hotel_policies) {
                const hotelName = await Hotel.findOne({ hotel_name })
                if (hotelName)
                    return res.status(400).json({ status: "failed", msg: "Hotel already registered." })
                const phoneNumber = await Hotel.findOne({ phone })
                if (phoneNumber)
                    return res.status(400).json({ status: "failed", msg: "Phone number already registered." })
                if (phone.length > 10 || phone.length < 10)
                    return res.status(400).json({ msg: "Please enter a valid phone number." })
                if (pan_no.length > 8 || pan_no.length < 8)
                    return res.status(400).json({ msg: "Please enter a valid PAN number." })
                const panNo = await Hotel.findOne({ pan_no })
                if (panNo)
                    return res.status(400).json({ msg: "This pan number is already registered." })
                if (hotel_images.length === 0)
                    return res.status(400).json({ msg: "Please add your hotel images." })
                if (hotel_facilities.length === 0)
                    return res.status(400).json({ msg: "Please add your hotel facilities." })
                if (hotel_policies.length === 0)
                    return res.status(400).json({ msg: "Please add your hotel policies." })
                const newHotel = new Hotel({
                    hotel_name, address, phone, hotel_email, pan_no, price, hotel_images, hotel_info, hotel_facilities, hotel_policies, user: req.user._id
                })
                await newHotel.save();
                res.json({
                    status: 'success',
                    msg: 'Hotel Created!',
                    newHotel: {
                        ...newHotel._doc,
                        user: req.user
                    }
                })
            } else {
                return res.status(500).json({ status: "failed", msg: "Please fill all the fields" })
            }
        } catch (error) {
            return res.status(500).json({ status: "failed", msg: error.message })
        }
    },
    approveHotel: async (req, res) => {
        try {
            // const hotel = await Hotel.findOneAndUpdate({ _id: req.params.id }, {
            //     hotel_validity: true
            // }, { new: true })

            const hotel = await Hotel.findOne({ _id: req.params.id })

            if (hotel.hotel_validity === false) {
             const newHotel = await Hotel.findOneAndUpdate({ _id: hotel._id }, {
                    hotel_validity: true
                }, { new: true })
            
            res.json({
                status: "success",
                msg: "Hotel approved!",
                newHotel: {
                    ...newHotel._doc
                }
            })}else{
            const newHotel= await Hotel.findOneAndUpdate({ _id: hotel._id }, {
                            hotel_validity: false
                        }, { new: true })
                        res.json({
                            status: "success",
                            msg: "Hotel not approved!",
                            newHotel: {
                                ...newHotel._doc
                            }
                        })
            }

            // if (hotel.hotel_validity === false) {
            //     await Hotel.findOneAndUpdate({ _id: hotel._id }, {
            //         hotel_validity: true
            //     }, { new: true })
            // }
           
        } catch (error) {
            return res.status(500).json({ status: "failed", msg: error.message })
        }
    }

}
module.exports = hotelCtrl