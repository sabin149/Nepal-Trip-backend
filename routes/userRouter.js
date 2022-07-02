const router = require('express').Router()
const auth = require("../middleware/auth")
const authAdmin = require("../middleware/auth-admin")
const userCtrl = require("../controllers/userCtrl")

router.get('/user', userCtrl.getUsers)
router.get('/user/:id', auth, userCtrl.getUser)
router.delete('/user/:id', auth, userCtrl.deleteUser)
router.patch('/user/:id', auth, userCtrl.updateUser)
router.patch('/updateuser/:id', auth, userCtrl.adminUpdateUser)
router.patch("/user/:id", auth, authAdmin, userCtrl.changeUserRole);
router.post("/send-reset-password-email", userCtrl.sendUserPaswordResetEmail);
router.post("/reset-password/:id/:token", userCtrl.resetUserPassword);
router.post('/changepassword', auth, userCtrl.changeUserPassword);

module.exports = router