const userRouter = require('express').Router()
require('dotenv').config()
const mongoose = require('mongoose');
const z = require('zod')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { User, Account } = require('../config/db.js')
const { signup, signin, update } = require('../zod/types.js');
const { authMiddleware } = require('../middleware/middleware.js');

const JWT_SECRET = process.env.JWT_SECRET

// Signup route
// this route is used to signup/register a new user
userRouter.post('/signup', async (req, res) => {
    const { firstName, lastName, username, password } = req.body;

    const validation = signup.safeParse(req.body)
    if (!validation.success) {
        return res.status(411).json({
            msg: 'you send the wrong inputs'
        })
    }

    const user = await User.findOne({username: username})
    if (user) {
        return res.status(411).json({
            msg: 'username already taken'
        })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    try {
        const dbUser = await User.create({
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: hashedPassword,
        })
        const userId = dbUser._id

        await Account.create({
            userId: userId,
            balance: 1 + Math.random() * 10000
        })

        const token = jwt.sign({ userId: dbUser._id }, JWT_SECRET )
        return res.status(201).json({
            msg: "signup successful",
            token: token
        });
    } catch (e) {
        return res.status(411).json({
            msg: "Invalid Inputs",
            error: e.message
        })
    }
})

// /signin - this route is used to signin the user.
// this route returns a jwt token
userRouter.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    const validation = signin.safeParse(req.body)
    if (!validation.success) {
        return res.status(411).json({
            msg: "Invalid Inputs"
        })
    }
    const user = await User.findOne({ username: username })
    const compare = await bcrypt.compare(password, user.password)
    if (!compare) {
        return res.status(411).json({
            msg: "incorrect username or password"
        })
    }
    try {
        const token = jwt.sign(
            { userId: user._id },
            JWT_SECRET,
            { expiresIn: '1h' }
        )
        return res.status(201).json({
            msg: "signin successful",
            token: token,
            user: user
    });
    } catch (e) {
        return res.status(411).json({
            msg: 'your username is incorrect',

        })
    }
})

// /update - this route is used to update user's information such as firstName, lastName, password
// username cannot be changed.
userRouter.put('/update', authMiddleware, async (req, res) => {
    const { firstName, lastName, password } = req.body;
    const validation = update.safeParse(req.body)
    if (!validation.success) {
        return res.status(411).json({
            msg: 'Invalid Input',
            errors: validation.error.issues
        })
    }
    let updateData = {}
    if (firstName) updateData.firstName = firstName
    if (lastName) updateData.lastName = lastName

    if (password) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        updateData.password = hashedPassword
    }

    try {
        await User.updateOne (
        { _id: req.user._id },
        {
            updateData
        }
    )
    res.status(201).json({
        msg: "Data updated successfully",
    })
    } catch (e) {
        return res.status(411).json({
            msg: `couldn't find the user`
        })
    }
})

// /bulk - a get request to fetch the users by their firstName and lastName
// a filterable option so that users can search their friends and send them money.

userRouter.get('/bulk', async (req, res) => {
    const filter = req.query.filter || "";

    const words = filter.trim().split(/\s+/)
    const firstNameSearch = words[0]
    const lastNameSearch = words[1] || words[0]

    try {
        const users = await User.find({
            $or: [{
                firstName: {
                    "$regex": filter,
                    "$options": "i"
                }
            },{
                lastName: {
                    "$regex": filter,
                    "$options": "i"
                }
            }, {
                $and: [
                    {
                        firstName: { "$regex": firstNameSearch, "$options": "i" }
                    },
                    {
                        lastName: { "$regex": lastNameSearch, "$options": "i" }
                    }
                ]
            }]
        })
        return res.status(201).json({
            users: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        })
    } catch (e) {
        return res.status(411).json({
            msg: 'Error fetching users'
        })
    }
})

// /all route is created to fetch all the users.
// it might not get used anywhere or it should be moved to the admin if admin ever created
// it is created for testing purposes

userRouter.get('/all', async (req, res) => {
    const excludeUsername = req.query.user
    const filter = {}
    if (excludeUsername) {
        filter.username = { $ne: excludeUsername }
    }

    const users = await User.find(filter).select('-password')
    return res.status(200).json({
        users: users
    })
})

userRouter.get('/me', authMiddleware, async (req, res) => {
    // this needs to return user = { username, firstname, lastname }
    const userId = req.query.userId
    const user = await User.findOne({ _id: userId }).select('-password')
    return res.status(201).json({
        user: user,
        msg: 'successful'
    })
})

module.exports = userRouter