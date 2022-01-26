import React, { useEffect, useState } from 'react'
import { _fetch } from './tools'
import Nav from './Nav'
import Settings from './Settings'
import Modules from './Modules'
import AnswerList from './Modules/Answers/AnswerList'
import Mod from './Modules/Mod'
import CommandList from './Submodules/Commands/CommandList'
import NoAccess from './NoAccess'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MaterializePreloader from './react-components/materialize/Preloader'

import './styles.css'

export default () => {
	let [authData, setAuthData] = useState({})
	
	useEffect(() => {
		(async () => {
			const res = await _fetch('/auth')
			setAuthData(await res.json())
		})()
	}, [])
	
	return (
		<div className="row">
			<MaterializePreloader ready={authData.OAuthData}>
				<Router>
					<Nav {...authData} />
					<div className="container">
						{['admin', 'trusted'].includes(authData.user?.permissionLvl)
							?
								<Routes>
									<Route path="/" element={<Settings />} />
									<Route path="/modules" element={<Modules />} />
									<Route path="/modules/answers" element={<AnswerList />} />
									<Route path="/modules/mod" element={<Mod />} />
									<Route path="/submodules/commands" element={<CommandList />} />
								</Routes>
							
							: <NoAccess {...authData}/>
						}
					</div>
				</Router>
			</MaterializePreloader>
		</div>
	)
}
