const Users = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authCtrl = {

    register: async (req, res) => {
        try {
            const { fullname, username, gender, phone, email, password, password_confirmation, role } = req.body;
            let newUserName = username.toLowerCase().replace(/ /g, '')
            const user_name = await Users.findOne({ username: newUserName })
            if (user_name) return res.status(400).json({ status: "failed", msg: "This user name already exist." })
            if (phone.length < 10 || phone.length > 10) return res.status(400).json({ status: "failed", msg: "Phone number must be 10 numbers." })
            const user_phone = await Users.findOne({ phone })
            if (user_phone) return res.status(400).json({ status: "failed", msg: "This phone number already exist." })
            const user_email = await Users.findOne({ email })
            if (user_email) return res.status(400).json({ status: "failed", msg: "This email already exist." })
            if (password.length < 6)
                return res.status(400).json({ status: "failed", msg: "Password must be at least 6 characters." })
            if (password !== password_confirmation) return res.status(400).json({ status: "failed", msg: "Password and Confirmation Password Doesn't Match" });
            if(!role)
            return res.status(400).json({ status: "failed", msg: "User role is required" });
    
            const passwordHash = await bcrypt.hash(password, 12)
            const newUser = new Users({
                fullname, username: newUserName, gender, phone, email, password: passwordHash, role,
            })

            const access_token = createAccessToken({ id: newUser._id })
            const refresh_token = createRefreshToken({ id: newUser._id })
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/user/refresh_token',
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30days
            })
            await newUser.save()
            res.json({
                status: "success",
                msg: 'Register Success!',
                access_token,
                user: {
                    ...newUser._doc,
                    password: ''
                }
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await Users.findOne({ email })
            if (!user) return res.status(400).json({ status: "failed", msg: "This email does not exist." })
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({ status: "failed", msg: "Password is incorrect." })
            const access_token = createAccessToken({ id: user._id })
            const refresh_token = createRefreshToken({ id: user._id })
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30days
            })
            res.json({
                status: "success",
                msg: 'Login Success!',
                access_token,
                user: {
                    ...user._doc,
                    password: ''
                }
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/api/refresh_token' })
            return res.json({ status: "success", msg: "Logged out!" })
        } catch (err) {
            return res.status(500).json({ status: "failed", msg: err.message })
        }
    },
    generateAccessToken: async (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token) return res.status(400).json({ status: "failed", msg: "Please Login or Register For Hotel Booking" })
            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, async (err, result) => {
                if (err) return res.status(400).json({ status: "failed", msg: "Please Login or Register For Hotel Booking" })
                const user = await Users.findById(result.id).select("-password")
                if (!user) return res.status(400).json({ status: "failed", msg: "This does not exist." })
                const access_token = createAccessToken({ id: result.id })
                res.json({
                    status: "success",
                    access_token,
                    user
                })
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}
const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}
const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' })
}
module.exports = authCtrl