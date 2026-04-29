const appRouter = require('express').Router()
const userRouter = require('./user')

appRouter.use('/user', userRouter)

module.exports = appRouter;