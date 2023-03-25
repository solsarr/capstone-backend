const express = require('express');
const cors = require('cors')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')

const app = express();

// controller import

// // app middleware(express)

const userController = require('./controllers/user-controller')
const postController = require('./controllers/post-controller');
const { json } = require('express');

app.use(express.json())


require("dotenv").config()
require('./config/db.connection')

const {PORT ,MONGODB_URI } = process.env

//cors function
app.use(cors())
//morgan function
app.use(morgan('combined'))

app.use('/user', userController)
app.use('/post', postController)
 
// root router
app.get('/', (req,res) => res.redirect('/user'))


app.listen(process.env.PORT || 4000);