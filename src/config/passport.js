const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const argon2 = require('argon2')
const dotenv = require('dotenv')
const User = require('../models/user.js')

dotenv.config()

passport.use(
	new LocalStrategy(async (username, password, done) => {
		try {
			const user = await User.findByUsername(username)
			if (!user) {
				return done(null, false, { message: 'Неправильное имя пользователя' })
			}
			const isMatch = await argon2.verify(user.password, password)
			if (!isMatch) {
				return done(null, false, { message: 'Неверный пароль' })
			}
			return done(null, user)
		} catch (err) {
			return done(err)
		}
	})
)

passport.use(
	new JWTStrategy(
		{
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.JWT_SECRET
		},
		async (jwtPayload, done) => {
			try {
				const user = await User.findById(jwtPayload.sub)
				if (!user) {
					return done(null, false, { message: 'Пользователь не найден' })
				}
				return done(null, user)
			} catch (err) {
				return done(err)
			}
		}
	)
)

passport.serializeUser((user, done) => {
	done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
	try {
		const user = User.findById(id)
		done(null, user)
	} catch (err) {
		return done(err)
	}
})
