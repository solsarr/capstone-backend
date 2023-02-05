const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const Cookies = require('cookies');
const authMiddleware = require('../middleware/authJwt')

const tokenSecret = process.env.TOKEN_SECRET || 'secret';

const User = require('../models/user')
// const { handleValidateOwnership, requireToken } = require('../middleware/auth')
// const {Post} = require('../models')
require('crypto').randomBytes(64).toString('hex')
// Json body
// router.use(express.json())

const db = require('../models/user')
// console.log(User)
function generateAccessToken(username) {
    return jwt.sign(User._id, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}


router.post('/signup', async (req, res) => {
    // parse user info from request i.e. const { name, email, password } = req.body
    const { username, password } = req.body
    const user = await User.findOne({ username });

    if (user) {
        return res.status(400).send('User already exists');
    }

    console.log({ username, password })
    const newUser = await User.create({ username, password });

    // save user with hashed password in database
    // create json web-token and set as session cookie
    const token = jwt.sign({ id: newUser._id }, tokenSecret, { expiresIn: '1800s' });
    console.log({ token })
    const cookies = Cookies(req, res);
    cookies.set('movierec.auth', token, { maxAge: Date.now() + 1000 * 60 * 60 * 24 }) // 24 hrs
    res.status(200).send('success');
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    // json token auth - backend is just api that serves data (json) <-- use this one
    // query db get user and compare password
    // if matches create json token and add as session cookie
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(404).send('User not found');
    }
    if (password !== user.password) {
        return res.status(401).send('unauthorized')
    }
    // save user with hashed password in database
    // create json web-token and set as session cookie
    const token = jwt.sign({ id: user._id }, tokenSecret, { expiresIn: '1800s' });
    console.log({ token })
    const cookies = Cookies(req, res);
    cookies.set('movierec.auth', token, { maxAge: Date.now() + 1000 * 60 * 60 * 24 }) // 24 hrs
    res.status(200).send('success');
});
router.get('/refresh', async (req, res) => {
    console.log('workingngggg')
    // ignore routes that don't need to be authenticated
    const cookies = Cookies(req, res)

    const cookie = cookies.get('movierec.auth')
    console.log('cookie = ', cookie)
    if (!cookie) {
        return res.status(401).send('unauthorized')
    }
    const response = jwt.verify(cookie, tokenSecret)
    console.log(response)
    if (!response || !response.id) {
        return res.status(401).send('unauthorized')
    }
    const user = await User.findById(response.id)
    if (!user) {
        res.status(401).send('unauthorized')
    }
    res.status(200).send('success')

})

//INDEX ROUTE
router.get('/', authMiddleware, async (req, res) => {
    try {
        console.log('user = ', req.user)
        const allUsers = await User.find({})
        res.status(200).json(allUsers)
    } catch (err) {
        res.status(400).json({ error: err })
    }
})

router.post('/', async (req, res) => {

    try {
        // 
        const newUser = await User.create(req.body)
        res.status(201).json(newUser)

    } catch (err) {
        res.status(400).json({ error: err })
    }
})
router.get('/:id', async (req, res) => {
    try {

        const foundUser = await User.findById(req.params.id)
        res.status(200).json(foundUser)

    } catch (err) {
        res.status(400).json({ error: err })
    }
})
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedUser)

    } catch (err) {
        // console.log(err)
        res.status(400).json({ error: err })
    }
})

router.put('/:id', async (req, res) => {

    try {

        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(updatedUser)

    } catch (err) {
        res.status(400).json({ error: err })
    }
})

module.exports = router