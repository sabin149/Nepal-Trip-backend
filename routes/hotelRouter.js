const router = require('express').Router();
const hotelCtrl=require("../controllers/hotelCtrl")
const auth=require("../middleware/auth")
const authVendor=require("../middleware/auth-vendor")
const authAdmin=require("../middleware/auth-admin")

router.get("/search",hotelCtrl.searchHotel)

router.route("/hotel")
.post(auth,authVendor, hotelCtrl.createHotel)
.get( hotelCtrl.getHotels)
.get(auth, hotelCtrl.searchHotel)

// router.patch("/approveHotel/:id",auth,authAdmin,hotelCtrl.approveHotel)
router.patch("/approveHotel/:id",hotelCtrl.approveHotel)

router.route("/hotel/:id")
.get(hotelCtrl.getHotel)
.patch(auth,authVendor,hotelCtrl.updateHotel)

router.patch("/saveFavourite/:id",auth,hotelCtrl.saveFavouriteHotel)
router.patch("/unSaveFavourite/:id",auth,hotelCtrl.unSaveFavouriteHotel)
router.get("/getFavouriteHotels",auth,hotelCtrl.getFavouriteHotels)

module.exports = router;
