const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')

usersRouter.post('/', async (req, res) => {
    const { username, name, password } = req.body

    const checkUser = await User.find({ username })
    // validate username
    if (!username) {
        return res.status(400).json({
            error: 'username missing'
        })
    } else if (username.length < 3) {
        return res.status(400).json({
            error: 'username length must be at least 3 characters long'
        })
    } else if (checkUser.length > 0) {
        if (username === checkUser[0].username) {
            return res.status(400).json({
                error: 'username must be unique'
            })
        }
    }// validate password 
    else if (!password) {
        return res.status(400).json({
            error: 'password missing'
        })
    } else if (password.length < 3) {
        return res.status(400).json({
            error: 'password length must be at least 3 characters long'
        })
    }

    //hash password
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username: username,
        name: name,
        password: passwordHash
    })

    const savedUser = await user.save()
    res.status(201).json(savedUser)
})

usersRouter.get('/', async (req, res) => {
    const allUsers = await User
        .find({})
        .populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
    res.json(allUsers)
})

usersRouter.delete('/',async (req,res) => {
  // await User.deleteMany({})
  res.status(400).end()
})

module.exports = usersRouter