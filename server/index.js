const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 3000
const apiRouter = require('./routes/index.js')

app.use(cors())
app.use(express.json())
app.use('/api/v1', apiRouter)

app.listen(PORT, () => {
    console.log(`app is listening to port ${PORT}`)
})