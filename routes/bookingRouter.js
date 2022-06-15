const router=require('express').Router();
const bookingCtrl=require("../controllers/bookingCtrl")
const auth=require("../middleware/auth")

router.post("/booking",auth,bookingCtrl.createBooking)
router.get("/booking",auth,bookingCtrl.getBookings)
router.get("/booking/:id",auth,bookingCtrl.getBooking)


module.exports=router;