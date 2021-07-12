const { createProxyMiddleware } = require('http-proxy-middleware')
const keys = require('../data/keys')

module.exports = createProxyMiddleware({
	target: keys.botchikee.api_url,
	changeOrigin: true,
	logLevel: 'warn',
	auth: keys.botchikee.auth,
	pathRewrite: {
		'^/api/modules': '/modules',
		'^/api/answers': '/answers',
	}
})
