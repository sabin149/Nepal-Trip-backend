const Hotels = require('../model/hotelModel');
const Rooms = require('../model/roomModel');
const Bookings = require('../model/bookingModel');
const transporter = require('../config/emailConfig');
const { APIfeatures } = require('../lib/features');

const bookingCtrl = {
    createBooking: async (req, res) => {
        try {
            const {
                room,
                hotel,
                start_date,
                end_date,
                total_amount,
                name,
                email,
                phone,
                address,
                request,
                tc,
                payment_id,
                payment_type,
                children,
                adults,
                rooms
            } = req.body

            if (!room || !hotel || !start_date || !end_date || !total_amount || !name || !email || !phone || !address || !payment_id || !payment_type || !adults) {
                return res.status(400).json({
                    status: "failed",
                    msg: "Please fill all the fields"
                })
            }
            const hotelDetails = await Hotels.findById(hotel);
            if (!hotelDetails) {
                return res.status(400).json({
                    status: "failed",
                    msg: "Hotel not found"
                })
            }
            const roomDetails = await Rooms.findById(room);
            if (!roomDetails) {
                return res.status(400).json({
                    status: "failed",
                    msg: "Room not found"
                })
            }
            if (!tc) {
                return res.status(400).json({
                    status: "failed",
                    msg: "Please accept the terms and conditions"
                })
            }
            if (phone.length > 10 || phone.length < 10) {
                return res.status(400).json({
                    status: "failed",
                    msg: "Please enter a valid phone number"
                })
            }
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
                return res.status(400).json({
                    status: "failed",
                    msg: "Please enter a valid email"
                })
            }
            const booking = new Bookings({
                user: req.user._id,
                room,
                hotel,
                start_date,
                end_date,
                total_amount,
                name,
                email,
                phone,
                address,
                request,
                tc,
                payment_id,
                payment_type,
                children,
                adults,
                rooms
            })
            await booking.save();

            let info = await transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to: email,
                // to: "dangalsabin2025@gmail.com",
                subject: 'Hotel Booking Details',
                html: ` <div style="position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                height: 400px;
                width: 600px;
                background: #f2f2f2;
                overflow: hidden;
                border-radius: 20px;
                cursor: pointer;
                box-shadow: 0 0 20px 8px #d0d0d0; ">
                    <h1 style=" text-decoration: underline; text-align: center;">Your Bookings Details</h1>
                    <h3 style="margin-left: 20%;">Payment Id: ${payment_id}</h3>
                    <h3 style="margin-left: 20%;">Hotel Name: ${hotelDetails.hotel_name}</h3>
                    <h3 style="margin-left: 20%;">Room Name: ${roomDetails.room_type}</h3>
                    <h3 style="margin-left: 20%;">Room Price: ${roomDetails.room_price}</h3> 
                    <h3 style="margin-left: 20%;">Your Request: ${request}</h3>
                    <h3 style="margin-left: 20%;">Start Date: ${start_date}</h3>
                    <h3 style="margin-left: 20%;">End Date: ${end_date}</h3>
                    <h3 style="margin-left: 20%;">Total Amount: ${total_amount}</h3>
                    <h3 style="margin-left: 20%;">Your Name: ${name}</h3>
                    <h3 style="margin-left: 20%;">Your Email: ${email}</h3>
                    <h3 style="margin-left: 20%;">Your Phone: ${phone}</h3>
                    <h3 style="margin-left: 20%;">Your Address: ${address}</h3>
                    </div> `
            });
            return res.json({
                status: "success",
                msg: "Booking created successfully, Check your Email for more details",
                booking: {
                    ...booking._doc
                },
                info
            })
        } catch (error) {
            return res.status(500).json({
                status: "failed",
                msg: error.message
            })
        }
    },
    // get bookings api
    getBookings: async (req, res) => {
        try {
            const features = new APIfeatures(Bookings.find().populate('user').
                populate('room').
                populate('hotel'), req.query).sorting()
            const result = await Promise.allSettled([
                features.query,
                Bookings.countDocuments()
            ])
            const bookings = result[0].status === "fulfilled" ? result[0].value : []
            const count = result[1].status === "fulfilled" ? result[1].value : 0;
            return res.json({
                status: "success",
                count,
                bookings
            })
        } catch (error) {
            return res.status(500).json({
                status: "failed",
                msg: error.message
            })
        }
    },
    // this is bookinng api: 
    getBooking: async (req, res) => {
        try {
            const booking = await Bookings.findById(req.params.id).populate('user').
                populate('room').
                populate('hotel');
            return res.json({
                status: "success",
                booking
            })
        } catch (error) {
            return res.status(500).json({
                status: "failed",
                msg: error.message
            })
        }
    },
    getBookingByHotel: async (req, res) => {
        try {
            const features = new APIfeatures(Bookings.find({ hotel: req.params.id }).populate({
                path: 'user',
                select: '-password'
                
            }).
                populate('room').
                populate('hotel'), req.query).sorting()
            const result = await Promise.allSettled([
                features.query,
                Bookings.countDocuments()
            ])
            const bookings = result[0].status === "fulfilled" ? result[0].value : []
            const count = result[1].status === "fulfilled" ? result[1].value : 0;

            const realCount = bookings.length;
            return res.json({
                status: "success",
                count,
                realCount,
                bookings
            })
        } catch (error) {
            return res.status(500).json({
                status: "failed",
                msg: error.message
            })
        }
    },
    // update bookings api
    updateBooking: async (req, res) => {
        try {
            const {
                name,
                email, phone, address,
                request } = req.body;
            if (!name || !email || !phone || !address) {
                return res.status(400).json({
                    status: "failed",
                    msg: "Please fill all the fields"
                })
            }
            if (phone.length > 10 || phone.length < 10) {
                return res.status(400).json({
                    status: "failed",
                    msg: "Please enter a valid phone number"
                })
            }
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
                return res.status(400).json({
                    status: "failed",
                    msg: "Please enter a valid email"
                })
            }
            if (!email.includes('@gmail.com')) {
                return res.status(400).json({
                    status: "failed",
                    msg: "Please enter a valid email"
                })
            }

            const booking = await Bookings.findByIdAndUpdate(req.params.id, {
                user: req.user._id,
                name,
                email,
                phone,
                address,
                request,
            }, { new: true });
            return res.json({
                status: "success",
                msg: "Booking updated successfully",
                booking: {
                    ...booking._doc
                }
            })
        } catch (error) {
            return res.status(500).json({
                status: "failed",
                msg: error.message
            })
        }
    },
    deleteBooking: async (req, res) => {
        try {
            const booking = await Bookings.findByIdAndDelete(req.params.id);
            if (!booking) {
                return res.status(404).json({
                    "status": "failed",
                    msg: "Booking not found"
                })
            }
            return res.json({
                "status": "success",
                msg: "Booking deleted successfully",
                booking: {
                    ...booking._doc
                },
            })
        } catch (error) {
            return res.status(500).json({
                "status": "failed",
                msg: error.message
            })
        }
    }
}

module.exports = bookingCtrl;