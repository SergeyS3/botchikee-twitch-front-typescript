import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import AnswerList from './Modules/Answers/AnswerList'
import ModuleList from './Modules/ModuleList';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MaterializePreloader from './react_components/materialize/Preloader';

export default () => {
	let [authData, setAuthData] = useState({})
	
	useEffect(() => {
		(async () => {
			const res = await fetch('/auth')
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
								<Switch>
									<Route path="/" exact component={ModuleList} />
									<Route path="/answers" component={AnswerList} />
								</Switch>
							
							: <h4>You don't have permission to access bot settings</h4>
						}
					</div>
				</Router>
			</MaterializePreloader>
		</div>
	)
}
