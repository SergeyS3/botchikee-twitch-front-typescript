const fs = require('fs')
const path = require('path')
const {Router} = require('express')
const router = Router()

router.get('/', async (req, res) => {
	let webpackAssets = {}
	
	const webpackAssetsJson = await fs.promises.readFile(path.join(__dirname, '../webpack-assets.json'), 'utf-8')
	if(webpackAssetsJson)
		webpackAssets = JSON.parse(webpackAssetsJson).main
	
	res.render('index', {
		webpackAssets
	})
})

module.exports = router