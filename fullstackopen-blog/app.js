require('dotenv').config()
const logger = require('./utils/logger')
const config = require('./utils/config')
const express = require('express')
//try catch handler library for async function
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const logInRouter = require('./controllers/logIn')
const middleware = require('./utils/middleware')

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('Connected to MONGODB.')
    })
    .catch(err => {
        logger.error('Error while connection to MONGODB.',err)
    })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs',blogRouter)
app.use('/api/users',userRouter)
app.use('/api/login',logInRouter)
app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

module.exports = app