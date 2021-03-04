const {createProxyMiddleware} = require('http-proxy-middleware')
const keys = require('../data/keys')

module.exports = createProxyMiddleware({
	target: keys.BOTCHIKEE_API_URL,
	changeOrigin: true,
	logLevel: 'warn',
	auth: keys.BOTCHIKEE_AUTH,
	pathRewrite: {
		'^/api/answers': '/answers',
	}
})
