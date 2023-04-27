module.exports = {
	ensureAuthenticated: (req, res, next) => {
		if (req.isAuthenticated()) {
			return next()
		}
		req.flash('error', 'Authentication is required')
		res.redirect('/auth/login')
	}
}
