const express = require('express')
const { roomController } = require('../controllers')
const router = express.Router()


router.post('/room', roomController.postRoom)

module.exports = router
