const express = require('express')
const dotenv = require('dotenv')
const flash = require('express-flash')

dotenv.config()

const indexRouter = require('./routes/index.js')
const authRouter = require('./routes/auth.js')

const app = express()

app.use(express.json())
app.use(flash())
app.use(express.urlencoded({ extend: false }))

app.use('/', indexRouter)
app.use('/auth', authRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`)
})

module.exports = app
