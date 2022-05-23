const Hotel = require('../model/hotelModel');
const hotelCtrl = {
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
                    hotel_name, address, phone, hotel_email, pan_no, price, hotel_images, hotel_info, hotel_facilities, hotel_policies,user:req.user._id
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
}
module.exports=hotelCtrl