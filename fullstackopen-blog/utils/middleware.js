const jwt = require('jsonwebtoken')
const logger = require('./logger')
const User = require('../models/user')

const requestLogger = (req,res,next) => {
    logger.info('Method:',req.method)
    logger.info('Path: ',req.path)
    logger.info('Body: ',req.body)
    logger.info('-----------------')
    next()
}

const errorHandler = (err,req,res,next) => {
    logger.error(err.message)

    if(err.name === 'CastError'){
        return res.status(400).json({error:'malformatted id'})
    }else if(err.name === 'ValidationError'){
        return res.status(400).json(err.message)
    }else if(err.name === 'JsonWebTokenError'){
        return res.status(401).json({error:'invalid token'})
    }else if(err.name === 'TokenExpiredError'){
        return res.status(401).json({error:'token expired'})
    }

    next(err)
}

const unknownEndPoint = (req,res) => {
    res.status(404).json({error:'unknown endpoint'})
}

const tokenExtractor = (req,res,next) => {
    const authorization = req.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        req.token = authorization.substring(7)
    }
    next()
}

const userExtractor = async (req,res,next) => {
    //check validity of token
    const decodeToken = jwt.verify(req.token,process.env.SECRET)
    req.user = await User.findById(decodeToken.id)
    next()
}

module.exports={
    requestLogger,
    errorHandler,
    unknownEndPoint,
    tokenExtractor,
    userExtractor,
}