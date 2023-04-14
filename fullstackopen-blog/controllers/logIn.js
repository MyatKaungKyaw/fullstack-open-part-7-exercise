const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const loginRouter = require('express').Router()

loginRouter.post('/', async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({ username })

    const passwordCorrect = user === null
        ? false
        //compare password from request and hash
        : await bcrypt.compare(password, user.password)

    if (!(user && passwordCorrect)) {
        return res.status(401).json({ error: 'username or password is incorrect' })
    }

    const userForToken = {
        usrename: user.username,
        id: user._id
    }

    //create token with time expiration
    const token = jwt.sign(
        userForToken,
        process.env.SECRET,
        { expiresIn: 60 * 60 }
    )

    res
        .status(200)
        .send({
            token: token,
            username: user.username,
            name: user.name,
        })
})

module.exports = loginRouter