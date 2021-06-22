import React from 'react'
import AnswerList from './Answers/AnswerList'
import ModuleList from './Modules/ModuleList';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

export default () => {
	return (
		<Router>
			<Switch>
				<Route path="/" exact component={ModuleList} />
				<Route path="/answers" component={AnswerList} />
			</Switch>
		</Router>
	)
}
