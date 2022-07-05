const express = require('express')
const router = express.Router()
const { register, login, getUsers } = require('../controller/users.js')
const { protect } = require('../middlewares/auth.js')
// const { protect } = require('../middlewares/auth.js')

router
  .post('/register', register)
  .post('/login', login)
//   .post('/refresh-token', refreshToken)
  .get('/', protect, getUsers)
//   .delete('/:id', deleteUser)

module.exports = router
