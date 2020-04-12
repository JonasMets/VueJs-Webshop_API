// 
//  här finns alla metoder/funktioner för att utföra anropen från routeOrders
//

// importerar funktioner från mongoose
const mongodb = require('mongoose')

//  här importerar vi Schema/model för Order
const Order = require('../models/orders/schemaForOrders');


// @desc Lägger till order
// @route POST /api/v1/orders
//  lägger till en order
exports.addOrder = (req, res)=>{


  // res.send('POST lägg till en order')

  let newOrder = new Order({
    _id: new mongodb.Types.ObjectId,
    userId: req.body.userId,
    userData: req.body.userData,
    shippingData: req.body.shippingData,
    orderItems: req.body.orderItems,
    orderTotalAmount: req.body.orderTotalAmount

  })
  newOrder.save()
  .then(()=>{
    return res.status(200).json({
      statusCode: 200,
      status: true,
      message: 'Order created'
    })
    
  })
  .catch((error) => {
    console.log(error)
    return res.status(400).json({
      statusCode: 400,
      status: false,
      message: 'Unable to create order',
      error: error
    })
  })

}
// slut lägger till en order


// @desc Hämta alla order 
// @route GET /api/v1/orders
exports.getOrders = (req, res, next) => {
  // console.log(req.params)

  // res.send('GET all orders')

  Order.find()
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((error) => {
      res.status(400).json(error)
    })
  // 
};



// @desc Hämta en order med :id
// @route GET /api/v1/orders/id 
exports.getOneOrder = (req, res, next) => {
  // console.log(req.params)

  // res.send('GET one order with id:'+req.params.id)

  Order.find({ _id: req.params.id })
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((error) => {
      res.status(400).json(error)
    })
  // res.send('GET one product with id:'+req.params.id)
};


// @desc Hämta alla ordrar som en kund har med kund userId
// @route GET /api/v1/orders/customer/userId
exports.getCustomerOrders = (req, res, next) => {
  // console.log(req.params)
  // res.send('GET all order that customer has with customer id:'+req.params.id)

  Order.find({ userId: req.params.id })
    .then((data) => {
      //
      const counter = data.length;
      res.status(200).json({
        statusCode: 200,
        status: true,
        message: (counter > 0 ? 'Data was retrieved' : `No data for user with id:${req.params.id}`),
        count: counter,
        data
      })

    })
    .catch((error) => {
      res.status(400).json({
        statusCode: 400,
        status: false,
        message: 'Could not get any data',
        error})
    })
  // 
};




