const Users = require('../model/userModel')
const Hotels = require('../model/hotelModel')
const Rooms = require('../model/roomModel');
const Bookings = require('../model/bookingModel');
const Reviews = require('../model/reviewModel');

const { APIfeatures } = require("../lib/features")

const userCtrl = {
    getUsers: async (req, res) => {
        try {
            const features = new APIfeatures(Users.find(), req.query).sorting();

            const result = await Promise.allSettled([
                features.query,
                Users.countDocuments() // count number of users
            ])

            const users = result[0].status === "fulfilled" ? result[0].value : [];
            const count = result[1].status === "fulfilled" ? result[1].value : 0;

            res.json({ status: 'success', count, users });
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.params.id).select('-password')
            if (!user) return res.status(400).json({ status: "failed", msg: "User does not exist." })
            res.json({ status: "success", user })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateUser: async (req, res) => {
        try {
            const { avatar, username, fullname, phone, address, gender } = req.body
            if (!fullname) return res.status(400).json({ status: "failed", msg: "Please add your full name." })
            const updatedUser = await Users.findOneAndUpdate({ _id: req.user._id }, {
                avatar, username, fullname, phone, address, gender
            })

            res.json({
                status: "success", msg: "Update Success!", updatedUser: {
                    ...updatedUser._doc
                }
            })
        } catch (err) {
            return res.status(500).json({ status: "failed", msg: err.message })
        }
    },
    adminUpdateUser: async (req, res) => {
        try {
            const { avatar, fullname, username, phone, address, gender } = req.body
            if (!fullname) return res.status(400).json({ status: "failed", msg: "Please add your full name." })

            const updatedUser = await Users.findOneAndUpdate({ _id: req.params.id }, {
                avatar, username, fullname, phone, address, gender
            })

            res.json({
                status: "success", msg: username + "Profile Updated!", updatedUser: {
                    ...updatedUser._doc
                }
            })
        } catch (err) {
            return res.status(500).json({ status: "failed", msg: err.message })
        }
    },
    deleteUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await Users.findById(userId);
            if (!user) return res.status(400).json({ status: "failed", msg: "User does not exist." })

            await Users.findOneAndDelete({ _id: userId });
            await Hotels.findOneAndDelete({ user: userId });
            await Rooms.findOneAndDelete({ user: userId });
            await Bookings.findOneAndDelete({ user: userId });
            await Reviews.findOneAndDelete({ user: userId });
            res.json({ status: "success", msg: "User Deleted Successfully" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    changeUserRole: async (req, res) => {
        try {
            const { role } = req.body;
            if (!role)
                return res.status(400).json({ status: "failed", msg: "Role field is required" })

            if (role === "admin" || role === "user" || role === "vendor") {
                const newUser = await Users.findByIdAndUpdate(req.params.id, { $set: { role } });
                res.json({
                    status: "success", msg: `Role changed to ${role} successfully`, newUser: {
                        ...newUser._doc
                    }
                })
            } else {
                res.status(400).json({ status: "failed", msg: "This role does not exist" })
            }
        } catch (error) {
            return res.status(500).json({ status: "failed", msg: error.message })
        }
    }
}
module.exports = userCtrl;

