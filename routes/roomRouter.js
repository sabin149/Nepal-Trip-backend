const router = require('express').Router();
const roomCtrl=require("../controllers/roomCtrl")
const auth=require("../middleware/auth")
const authVendor=require("../middleware/auth-vendor")

router.route("/room")
.post(auth,authVendor, roomCtrl.createHotelRoom)


module.exports = router;