const users = require('../data/users')

module.exports = (req, res, next) => {
	if(!['admin', 'trusted'].includes(users[req.session.twitch?.login]))
		res.status(403).send('403 Forbidden')
	else
		next()
}
