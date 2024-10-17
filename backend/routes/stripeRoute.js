const express = require('express')
const {handelStripe} = require('../controllers/stripeController.js')
const router = express.Router()
 
router.post('/',handelStripe)
module.exports =router