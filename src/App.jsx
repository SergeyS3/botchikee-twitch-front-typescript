import React, { useEffect, useState } from 'react'
import Tools from './tools/Tools'
import Nav from './Nav'
import ModuleList from './Modules/ModuleList'
import AnswerList from './Modules/Answers/AnswerList'
import Mod from './Modules/Mod'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MaterializePreloader from './react-components/materialize/Preloader'

import './styles.css'

export default () => {
	let [authData, setAuthData] = useState({})
	
	useEffect(() => {
		(async () => {
			const res = await Tools.fetch('/auth')
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
									<Route path="/" exact element={<ModuleList />} />
									<Route path="/answers" element={<AnswerList />} />
									<Route path="/mod" element={<Mod />} />
								</Routes>
							
							: <h4>You don't have permission to access bot settings</h4>
						}
					</div>
				</Router>
			</MaterializePreloader>
		</div>
	)
}
