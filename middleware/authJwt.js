const Cookies = require('cookies')
const jwt = require('jsonwebtoken')
const tokenSecret = process.env.TOKEN_SECRET || 'secret';
const User = require('../models/User')


const authMiddleware =  async (req, res, next) => {
    console.log('workingngggg')
    // ignore routes that don't need to be authenticated
    const cookies = Cookies(req, res)

    const cookie = cookies.get('movierec.auth')
    console.log('cookie = ', cookie)
    if (!cookie){
       return res.status(401).send('unauthorized')
    }
    const response = jwt.verify(cookie, tokenSecret)
    console.log(response)
    if (!response || !response.id){
        return res.status(401).send('unauthorized')
    }
    const user = await User.findById(response.id)
    if (!user){
        res.status(401).send('unauthorized')
    }
    req.user = user
    console.log(user)
    next()
    // check cookies for "auth" cookie
    // parse token using secret
    // if you get a token that's parsable
    // query database for user and add it to req.user
    // if valid call next(req, res)
    // if not redirect to login
}

module.exports= authMiddleware

