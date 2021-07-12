const { Router } = require('express')
const router = Router()
const fetch = require('node-fetch');
const querystring = require('querystring');
const { client_id, client_secret, redirect_uri } = require('../data/keys').twitch
const users = require('../data/users')

const getTwitchToken = async query => {
	if(!query.code && query.error)
		throw Error(`getTwitchToken ${query.error} error: ${query.error_description}`)
	
	const res = await fetch('https://id.twitch.tv/oauth2/token?' + querystring.stringify({
		client_id,
		client_secret,
		code: query.code,
		grant_type: 'authorization_code',
		redirect_uri
	}), {
		method: 'POST'
	})
	
	const data = await res.json()
	
	if(res.status !== 200)
		throw Error(`getTwitchToken error: ${res.status} ${data.message}`)
	
	return data.access_token
}
const getTwitchUser = async query => {
	const token = await getTwitchToken(query)
	
	const res = await fetch('https://api.twitch.tv/helix/users', {
		headers: {
			Authorization: `Bearer ${token}`,
			'Client-Id': client_id
		},
	})
	
	const data = await res.json()
	
	if(res.status !== 200)
		throw Error(`getTwitchUser error: ${res.status} ${data.message}`)
	
	return data.data[0]
}

router.get('/', (req, res) => {
	const twitchData = req.session.twitch
	res.json({
		user: twitchData ? {
			name: twitchData.display_name,
			pic: twitchData.profile_image_url,
			permissionLvl: users[twitchData.login]
		} : {},
		OAuthData: {
			client_id,
			redirect_uri
		}
	})
})

router.get('/login', async (req, res) => {
	try {
		req.session.twitch = await getTwitchUser(req.query)
		res.redirect('/')
	}
	catch (e) {
		console.error(e.message)
		res.status(400).end('Auth error')
	}
})

router.get('/logout', async (req, res) => {
	req.session.twitch = null
	res.redirect('/')
})

module.exports = router
