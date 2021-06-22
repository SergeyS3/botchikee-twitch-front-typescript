const express = require('express')
const path = require('path')
const compression = require('compression')
const expHbs = require('express-handlebars')

const apiMiddleware = require('./middleware/api')
const errorHandler = require('./middleware/error')

const homeRoutes = require('./routes/home')

const port = 3010

const app = express()

app.use(compression())

const hbs = expHbs.create({
	defaultLayout: 'main',
	extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.use('/api', apiMiddleware)

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.use('/', homeRoutes)
app.use('/answers', homeRoutes)

app.use(errorHandler)

try {
	app.listen(port)
} catch (e) {
	console.error(e)
}
