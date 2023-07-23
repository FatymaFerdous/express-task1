const express = require('express')
const router = express.Router()

const { login , signup , allUsers , userbyEmail} = require('./Controller')

// router.get('/getuserprofile', getUserProfile)

router.post('/signup', signup)
router.post('/login', login)
router.get('/getallusers', allUsers)
router.get('/getuserbyemail', userbyEmail) 


module.exports = router;