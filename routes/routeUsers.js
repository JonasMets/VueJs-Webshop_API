// 
// routeUsers
// sätter upp en router för att hantera anrop till Users
// 
// importerar express och kopplar på router
const express = require('express');
const router = express.Router();


// importerar metoder från controllerUsers
const { loginUser, registerUser} = require('../controllers/controllerUser')


// här skapar vi koppling mellan anrop och metoder
// 
// kopplar ihop /api/v1/users med metod i controllerUser.js
//

// registerUser
// skapa användare
//   http://localhost:9999/api/v1/users/register
router.route('/register')
.post(registerUser)

// loginUser
// loggar in användare
//   http://localhost:9999/api/v1/users/login
router.route('/login')
.post(loginUser)


// skapa en default route om inget annat finns
router.get('/',(req,res)=>{
  res.send('Hello from default user')
})

// exporterar modulen
module.exports = router;
