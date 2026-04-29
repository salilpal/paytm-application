const userRouter = require('express').Router()
require('dotenv').config()
const mongoose = require('mongoose');
const z = require('zod')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { User } = require('../config/db.js')
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
        if (!user) {
        User.create({
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: hashedPassword,
        })
        }
        return res.status(201).json({
            msg: "signup successful"
        });
    } catch (e) {
        return res.status(411).json({
            msg: "Invalid Inputs"
        })
    }
})

// /signin - this route is used to signin the user.
// this route returns a jwt token
userRouter.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    const validation = signin.safeParse({
        username: username,
        password: password
    })
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
            { username: username },
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
        { username: req.user.username },
        {
            firstName: updateData.firstName,
            lastName: updateData.lastName,
            password: updateData.password
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
    const input = req.query.filter
    const inputArray = input.split(' ')
    const firstName = inputArray[0]
    const lastName = inputArray[1]
    let users = [];
    let lastNameUsers = [];
    try {
        users = await User.find({
            firstName: firstName
        })
        lastNameUsers = await User.find({
            lastName: lastName
        })
        users.concat(lastNameUsers)
        const uniqueUsers = [
            ...new Map(users.map(user => [user.username, user])).values()
        ]
        return res.status(200).json({
            msg: "users found",
            users: uniqueUsers
        })
    } catch (e) {
        return res.status(411).json({
            msg: 'unable to fetch users.'
        })
    }
})

/*
// there is another way same route can be created only by using mongoose.
userRouter.get('/bulk', async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        },{
            lastName: {
                "$regex": filter
            }
        }]
    })
    return res.status(201).json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})
*/

// /all route is created to fetch all the users.
// it might not get used anywhere or it should be moved to the admin
// it is created for testing purposes

userRouter.get('/all', async (req, res) => {
    const users = await User.find({})
    return res.status(200).json({
        users: users
    })
})

module.exports = userRouter
