const express = require('express')
const router = express.Router()
const {getAllProducts , addProduct } = require('./Controller')

// get all products
router.get('/products' , getAllProducts)


// add products
router.post('/addproduct' , addProduct)



module.exports = router;