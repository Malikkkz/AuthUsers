const express = require('express')
const passport = require('passport')
const { ensureAuthenticated } = require('../config/auth.js')

const router = express.Router()

router.get('/protected', ensureAuthenticated(), (req, res) => {
	res.json({ message: 'Доступ к защищенному ресурсу разрешен' })
})

module.exports = router
