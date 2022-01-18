import React from 'react'
import { Link } from 'react-router-dom'

import './Nav.css'

export default ({ OAuthData: { client_id, redirect_uri }, user }) => {
	const twitchOAuthParams = new URLSearchParams({
		client_id,
		redirect_uri,
		response_type: 'code'
	})
	
	return (
		<nav>
			<div className="nav-wrapper">
				<div className="col s12">
					<Link to="/" className="brand-logo">Botchikee</Link>
					<ul className="right hide-on-med-and-down">
						{user.name
						?
							<>
								<li><img src={user.pic} className="avatar" /></li>
								<li>{user.name}</li>
								<li><a href="/auth/logout">Logout</a></li>
							</>
						: <li><a href={`https://id.twitch.tv/oauth2/authorize?${twitchOAuthParams}`}>Login</a></li>
						}
						
					</ul>
				</div>
			</div>
		</nav>
	)
}
