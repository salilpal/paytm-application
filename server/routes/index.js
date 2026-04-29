const appRouter = require('express').Router()
const userRouter = require('./user')
const accountRouter = require('./account.js')

appRouter.use('/user', userRouter)
appRouter.use('/account', accountRouter)

module.exports = appRouter;