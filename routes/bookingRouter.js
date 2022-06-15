const router=require('express').Router();
const bookingCtrl=require("../controllers/bookingCtrl")
const auth=require("../middleware/auth")

router.post("/booking",auth,bookingCtrl.createBooking)


module.exports=router;