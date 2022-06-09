const Users = require('../model/userModel')
const Hotels = require('../model/hotelModel')
const Rooms = require('../model/roomModel')
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

            console.log(updatedUser);

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
    }
}

module.exports = userCtrl;

