const { createProxyMiddleware } = require('http-proxy-middleware')
const keys = require('../data/keys')

module.exports = createProxyMiddleware({
	target: keys.botchikee.rest_api_url,
	changeOrigin: true,
	logLevel: 'warn',
	auth: keys.botchikee.auth,
	pathRewrite: {
		'^/api/rest/settings': '/settings',
		'^/api/rest/modules': '/modules',
		'^/api/rest/submodules': '/submodules',
		'^/api/rest/answers': '/answers',
		'^/api/rest/mod-predefined-replacements': '/mod-predefined-replacements',
		'^/api/rest/mod-replacements': '/mod-replacements',
		'^/api/rest/mod-ban-words': '/mod-ban-words',
		'^/api/rest/commands': '/commands',
	}
})
