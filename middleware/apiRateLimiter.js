const rateLimit = require('express-rate-limit')

module.exports = apiRateLimiter = rateLimit({
	windowMs: 30 * 1000,
	max: 20
})