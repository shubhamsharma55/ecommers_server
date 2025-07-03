const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')

const router = require('express').Router()


router.post('/register',userCtrl.register)
router.post('/login',userCtrl.login)
router.get('/logout',userCtrl.logout)
router.post('/refershtoken',userCtrl.refershtoken)
router.get('/info',auth,userCtrl.getUser)

module.exports = router
