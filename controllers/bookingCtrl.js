const Hotels = require('../model/hotelModel');
const Rooms = require('../model/roomModel');
const Bookings = require('../model/bookingModel');
const Users = require('../model/userModel');
// const transporter  = require('../config/emailConfig');
const { APIfeatures } = require('../lib/features');

const bookingSCtrl = {
    createBooking: async (req, res) => {
        try {
            const { room, hotel,
                start_date, end_date,
                total_amount, name,
                email, phone, address,
                request, tc, payment_id, payment_type } = req.body;

            if (!room || !hotel || !start_date || !end_date || !total_amount || !name || !email || !phone || !address || !payment_id || !payment_type) {
                return res.status(400).json({
                    "status": "failed",
                    msg: "Please fill all the fields"
                })
            }
            if (!tc) {
                return res.status(400).json({
                    "status": "failed",
                    msg: "Please accept the terms and conditions"
                })
            }

            if (phone.length > 10 || phone.length < 10) {
                return res.status(400).json({
                    "status": "failed",
                    msg: "Please enter a valid phone number"
                })
            }
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
                return res.status(400).json({
                    "status": "failed",
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
                payment_type
            })
            await booking.save();

            // const userEmail = await Users.findById(req.user._id).select("email");

            // let info = await transporter.sendMail({
            //     from: process.env.EMAIL_FROM,
            //     to: userEmail,
            //     subject: 'Booking Link',
            //     html: `<h1>Your Bookings</h1>`
            // });


            return res.json({
                "status": "success",
                msg: "Booking created successfully",
                booking: {
                    ...booking._doc
                },
                info
            })

        } catch (error) {
            return res.status(500).json({
                "status": "failed",
                msg: error.message
            })

        }
    },
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
                "status": "success",
                count,
                bookings
            })
        } catch (error) {
            return res.status(500).json({
                "status": "failed",
                msg: error.message
            })
        }
    },
    getBooking: async (req, res) => {
        try {
            const booking = await Bookings.findById(req.params.id).populate('user').
                populate('room').
                populate('hotel');
            return res.json({
                "status": "success",
                booking
            })
        } catch (error) {
            return res.status(500).json({
                "status": "failed",
                msg: error.message
            })
        }
    },
    updateBooking: async (req, res) => {
        try {
            const {
                name,
                email, phone, address,
                request } = req.body;
            if (!name || !email || !phone || !address || !request) {
                return res.status(400).json({
                    "status": "failed",
                    msg: "Please fill all the fields"
                })
            }
            if (phone.length > 10 || phone.length < 10) {
                return res.status(400).json({
                    "status": "failed",
                    msg: "Please enter a valid phone number"
                })
            }
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
                return res.status(400).json({
                    "status": "failed",
                    msg: "Please enter a valid email"
                })
            }
            if (!email.includes('@gmail.com')) {
                return res.status(400).json({
                    "status": "failed",
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
                "status": "success",
                msg: "Booking updated successfully",
                booking: {
                    ...booking._doc
                }
            })
        } catch (error) {
            return res.status(500).json({
                "status": "failed",
                msg: error.message
            })
        }
    },



}

module.exports = bookingSCtrl;