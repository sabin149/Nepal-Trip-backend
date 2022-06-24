const router=require('express').Router();
const bookingCtrl=require("../controllers/bookingCtrl")
const auth=require("../middleware/auth")
const authVendor=require("../middleware/auth-vendor")


router.post("/booking",auth,bookingCtrl.createBooking)
router.get("/booking",auth,bookingCtrl.getBookings)
router.get("/booking/:id",auth,bookingCtrl.getBooking)
router.patch("/booking/:id",auth,bookingCtrl.updateBooking)
router.delete("/booking/:id",auth,bookingCtrl.deleteBooking)
router.get("/hotelbooking/:id",auth,authVendor, bookingCtrl.getBookingByHotel)


module.exports=router;