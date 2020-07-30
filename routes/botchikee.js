const {Router} = require('express')
const router = Router()
const webpackAssets = require('../webpack-assets.json').botchikee;

router.get('/', async (req, res) => {
	res.render('botchikee', {
		webpackAssets
	})
})

module.exports = router