const express = require('express');
const cors = require('cors')
const morgan = require('morgan')

const app = express();

// controller import

// // app middleware(express)

const userController = require('./controllers/user-controller')
const postController = require('./controllers/post-controller')
 
app.use(express.json())
 
  
require("dotenv").config()
require('./config/db.connection')

const { PORT, MONGODB_URI } = process.env


//cors function
app.use(cors())
//morgan function
app.use(morgan('dev'))

app.use('/user', userController)
app.use('/post', postController)
 
// root router
app.get('/', (req,res) => res.redirect('/user'))

app.listen(PORT, () => console.log(`Listening for client requests on port ${PORT}`));