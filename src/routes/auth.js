const express = require('express')
const argon2 = require('argon2')
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')
const passport = require('passport')

const router = express.Router()

router.post('/register', async (req, res) => {
	try {
		const { username, password } = req.body
		const existingUser = await User.findByUsername(username)
		if (existingUser) {
			return res.status(400).json({ message: 'User already exists' })
		}

		const hashedPassword = await argon2.hash(password)
		const newUser = new User(username, hashedPassword)

		const token = jwt.sign({ sub: newUser.id }, process.env.JWT_SECRET, {
			expiresIn: '1h'
		})

		res.status(201).json({ message: 'Пользователь зарегистрирован' })
	} catch (err) {
		res.status(500).json({ message: 'Ошибка сервера' })
	}
})

router.post('/login', passport.authenticate('local'), (req, res) => {
	res.json({ message: 'Successfully logged in' }, token)
})
