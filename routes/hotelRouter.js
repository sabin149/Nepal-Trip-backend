const router = require('express').Router();
const hotelCtrl=require("../controllers/hotelCtrl")
const auth=require("../middleware/auth")
const authVendor=require("../middleware/auth-vendor")

router.route("/hotel")
.post(auth,authVendor, hotelCtrl.createHotel)


module.exports = router;