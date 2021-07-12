const express = require('express')
const path = require('path')
const compression = require('compression')
const session = require('express-session')
const { secret } = require('./data/keys').express

const apiMiddleware = require('./middleware/api')
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
	resave: false
}));

app.use('/api', apiMiddleware)

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.use('/', homeRoutes)
app.use('/answers', homeRoutes)
app.use('/auth', authRoutes)

app.use(errorHandler)

try {
	app.listen(port)
} catch (e) {
	console.error(e)
}
