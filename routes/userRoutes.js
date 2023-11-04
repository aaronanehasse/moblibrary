const express = require('express');
// import router from express.Router();
const User = require('../schem/userSchem.js');
const { regUser, loginuser, getUser, echoGPT } = require('../controller/userController.js')


const router = express.Router()
router.post('/createuser', regUser)
router.post('/login', loginuser)
router.post('/getuser', getUser)
router.post('/echo', echoGPT)

module.exports = router