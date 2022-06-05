const router = require('express').Router()
const auth = require("../middleware/auth")
const userCtrl = require("../controllers/userCtrl")

router.get('/user', auth, userCtrl.getUsers)
router.get('/user/:id', auth, userCtrl.getUser)


module.exports = router