import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(411).json({
            msg: "auth header is missing or invalid"
        })
    }
    const token = authHeader.split(" ")[1]
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded
    } catch (e) {
        return res.status(403).json({
            msg: 'invalid token'
        })
    }
    next()
}