const { createProxyMiddleware } = require('http-proxy-middleware')
const keys = require('../data/keys')

module.exports = createProxyMiddleware({
	target: keys.botchikee.ws_api_url,
	changeOrigin: true,
	logLevel: 'warn',
	auth: keys.botchikee.auth,
	ws: true,
	pathRewrite: {
		'^/api/ws/settings': '/settings',
		'^/api/ws/modules': '/modules',
		'^/api/ws/submodules': '/submodules',
		'^/api/ws/answers': '/answers',
		'^/api/ws/mod-replacements': '/mod-replacements',
		'^/api/ws/mod-ban-words': '/mod-ban-words',
		'^/api/ws/commands': '/commands',
	}
})
