const z = require('zod')

const signup = z.object({
    firstName: z.string(),
    lastName: z.string(),
    username: z.string(),
    password: z.string().min(8)
})

const signin = z.object({
    username: z.string(),
    password: z.string().min(8)
})

const update = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    password: z.string().min(8).optional()
})

module.exports = {
    signup: signup,
    signin: signin,
    update: update
}