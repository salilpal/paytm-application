const accountRouter = require('express').Router()
const { default: mongoose } = require('mongoose');
const { Account, User } = require('../config/db')
const { authMiddleware } = require('../middleware/middleware.js');

accountRouter.get('/balance', authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.user.userId
    })

    return res.status(200).json({
        balance: account.balance
    })
})

accountRouter.post('/transfer', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession()

    session.startTransaction()
    const { amount, to } = req.body
    
    const account = await Account.findOne({ userId: req.user.userId }).session(session)

    if (!account || account.balance < amount) {
        await session.abortTransaction()
        return res.status(400).json({
            msg: "insufficient balance"
        })
    }

    const toAccount = await Account.findOne({ userId: to }).session(session)

    if(!toAccount) {
        await session.abortTransaction()
        return res.status(400).json({
            msg: "invalid account"
        })
    }

    await Account.updateOne({ userId: req.user.userId }, {$inc: { balance: -amount }}).session(session)
    await Account.updateOne({ userId: to }, {$inc: { balance: amount }}).session(session)

    await session.commitTransaction()
    return res.json({
        message: "Transaction successful"
    })
})

module.exports = accountRouter