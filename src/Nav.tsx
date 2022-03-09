import { IAuthData } from './types'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import './Nav.css'

const Nav: FC<IAuthData> = ({ TwitchOAuth: { client_id, redirect_uri }, user }: IAuthData) => {
	const twitchOAuthParams: string = new URLSearchParams({
		client_id,
		redirect_uri,
		response_type: 'code'
	}).toString()
	
	return (
		<nav>
			<div className="nav-wrapper">
				<div className="col s12">
					<Link to="/" className="brand-logo left">Botchikee</Link>
					<ul className="right">
						{user.name ? (
							<>
								<li><img src={user.pic} className="avatar" /></li>
								<li>{user.name}</li>
								<li><a href="/auth/logout">Logout</a></li>
							</>
						) :
							<li><a href={`https://id.twitch.tv/oauth2/authorize?${twitchOAuthParams}`}>Login</a></li>
						}
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default Nav
