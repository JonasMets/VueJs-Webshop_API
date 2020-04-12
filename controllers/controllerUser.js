// 
//  här finns alla metoder/funktioner för att utföra anropen från routeUsers
//

// importerar funktioner från mongoose
const mongodb = require('mongoose')


// här importerar vi Schema/model för Users
const User = require('../models/user/schemaForUser');
// här importerar vi modul för autentisering
const auth = require('../authentication/auth')
// 
const encrypt = require('bcrypt')


exports.registerUser = (req, res) => {

  try {
    console.log(1)
    
    User.find({ email: req.body.email })
    .then(exists => {
      console.log(2)
      console.log(exists)

      if (exists.length > 0) {
        console.log(3)
        return res.status(400).json({
          statusCode: 400,
          status: false,
          message: 'User with same email address already exists.'
        })
      }

      // console.log(req.body)

      encrypt.hash(req.body.passWord, encrypt.genSaltSync(10), (error, hash) => {
        console.log(4)
        if (error) {
          console.log(5)
          console.log(error)
          return res.status(500).json({
            statusCode: 500,
            status: false,
            message: 'Error: Failed to create user password hash.'
          })
        }

        const user = new User(
          {
            _id: new mongodb.Types.ObjectId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            passWordHash: hash
          }
        )

        user.save()
          .then(() => {
            res.status(201).json({
              statusCode: 201,
              status: true,
              message: 'User was successfully created.'
            })
          })
          .catch(error => {
            console.log(error)
            res.status(500).json({
              statusCode: 500,
              status: false,
              message: 'Unable to create user. Please contact the System Administrator.'
            })
          })
      })
    })
    console.log(5)


  } catch (error) {
    console.log(6)

    console.log(error.name)

    res.status(500).json({
      statusCode: 500,
      status: false,
      message: 'Unable to create user. Please contact the System Administrator.'
    })
  }


  
}


exports.loginUser = (req, res) => {

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user === null) {
        console.log(user)
        return res.status(401).json({
          statusCode: 401,
          status: false,
          message: 'Incorrect email address or password'
        })
      }

      try {
        encrypt.compare(req.body.password, user.passWordHash, (error, result) => {
          if (result) {
            return res.status(200).json({
              statusCode: 200,
              status: true,
              message: 'Authentication was successful.',
              token: auth.genToken(user._id),
              user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
              }
            })
          }
          console.log(error)

          return res.status(401).json({
            
            statusCode: 401,
            status: false,
            message: 'Incorrect email address or password'
          })

        })
      }
      catch {
        return res.status(500).json({
          statusCode: 500,
          status: false,
          message: 'Unable to authenticate user. Please contact the System Administrator'
        })
      }
    })
}



