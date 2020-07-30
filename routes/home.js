const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
	res.send('No index page ¯\\_(ツ)_/¯')
})

module.exports = router