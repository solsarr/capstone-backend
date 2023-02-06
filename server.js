const express = require('express');
const cors = require('cors')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')

const app = express();
const port = process.env.PORT || 4999

// controller import

// // app middleware(express)

const userController = require('./controllers/user-controller')
const postController = require('./controllers/post-controller');
const { json } = require('express');
 
app.use(express.json())
 
  
require("dotenv").config()
require('./config/db.connection')

const {MONGODB_URI } = process.env

//cors function
app.use(cors())
//morgan function
app.use(morgan('dev'))

app.use('/user', userController)
app.use('/post', postController)
 
// root router
app.get('/', (req,res) => res.redirect('/user'))


app.listen(port, () => console.log(`Listening for client requests on port ${port}`));