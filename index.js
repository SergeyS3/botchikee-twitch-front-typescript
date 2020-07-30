const express = require('express')
const path = require('path')
const expHbs = require('express-handlebars')

const errorHandler = require('./middleware/error')

const homeRoutes = require('./routes/home')
const botchikeeRoutes = require('./routes/botchikee')

const port = process.env.PORT || 3000

const app = express()

const hbs = expHbs.create({
	defaultLayout: 'main',
	extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.use('/', homeRoutes)
app.use('/botchikee', botchikeeRoutes)

app.use(errorHandler)

;(async function() {
	try {
		app.listen(port)
	} catch (e) {
		console.error(e)
	}
})()
