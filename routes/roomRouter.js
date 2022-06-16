const router = require('express').Router();
const roomCtrl = require("../controllers/roomCtrl")
const auth = require("../middleware/auth")
const authVendor = require("../middleware/auth-vendor")

router.route("/room")
    .post(auth, roomCtrl.createHotelRoom)

router.get("/getHotelRoom/:id",roomCtrl.getHotelRooms)

router.route('/room/:id')
    .get(roomCtrl.getHotelRoom)
    .patch (auth,authVendor, roomCtrl.updateHotelRoom)
    .delete(auth,roomCtrl.deleteHotelRoom)

module.exports = router;