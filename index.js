const express = require('express')
const path = require('path')
const compression = require('compression')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const { secret } = require('./data/keys').express

const apiRateLimiter = require('./middleware/apiRateLimiter')
const authMiddleware = require('./middleware/auth')
const apiProxyMiddleware = require('./middleware/apiProxy')
const errorHandler = require('./middleware/error')

const homeRoutes = require('./routes/home')
const authRoutes = require('./routes/auth')

const port = 3010

const app = express()

app.use(compression())

app.use(session({
	name: 'botchikee-front',
	secret,
	saveUninitialized: true,
	resave: false,
	store: new MongoStore({
		mongoUrl: 'mongodb://localhost/botchikee-front',
		ttl: 3600 * 24 * 365 * 2
	})
}))

app.use('/api', apiRateLimiter, authMiddleware, apiProxyMiddleware)

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.use('/', homeRoutes)
app.use('/answers', homeRoutes)
app.use('/mod', homeRoutes)
app.use('/auth', authRoutes)

app.use(errorHandler)

try {
	app.listen(port)
} catch (e) {
	console.error(e)
}
