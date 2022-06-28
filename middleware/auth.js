const Users = require("../model/userModel")
const jwt = require('jsonwebtoken')
  // Get user information by id
const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization")
        if(!token) return res.status(400).json({status: "failed",msg: "Invalid Authentication.1"})
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if(!decoded) return res.status(400).json({status: "failed",msg: "Invalid Authentication. 2"})
        const user = await Users.findOne({_id: decoded.id})
        req.user = user
        next()
    } catch (err) {
        return res.status(500).json({status: "failed",msg: err.message})
    }
}
module.exports = auth