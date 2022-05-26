const router = require('express').Router();
const hotelCtrl=require("../controllers/hotelCtrl")
const auth=require("../middleware/auth")
const authVendor=require("../middleware/auth-vendor")
const authAdmin=require("../middleware/auth-admin")

router.route("/hotel")
.post(auth,authVendor, hotelCtrl.createHotel)
.get(auth,authAdmin, hotelCtrl.getHotels)

router.patch("/approveHotel/:id",auth,authAdmin,hotelCtrl.approveHotel)

module.exports = router;