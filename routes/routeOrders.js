// 
// routeUsers
// sätter upp en router för att hantera anrop till Users
// 
// importerar express och kopplar på router
const express = require('express');
const router = express.Router();


// importerar metoder från controllerOrders
const { addOrder, getOneOrder, getOrders, getCustomerOrders} = require('../controllers/controllerOrders')


// här skapar vi koppling mellan anrop och metoder
// 
// kopplar ihop /api/v1/orders med metod i controllerOrders.js
//

// addOrder
// skapa en ny order
//   http://localhost:9999/api/v1/orders
router.route('/')
.post(addOrder)


// hämta alla order
//  http://localhost:9999/api/v1/orders
router.route('/')
.get(getOrders)

// hämta en order med :id
//  http://localhost:9999/api/v1/orders/ id
router.route('/:id')
.get(getOneOrder)

// hämta all order som en kund  har med :id
//  http://localhost:9999/api/v1/orders/customer/ id
router.route('/customer/:id')
.get(getCustomerOrders)


// exporterar modulen
module.exports = router;

