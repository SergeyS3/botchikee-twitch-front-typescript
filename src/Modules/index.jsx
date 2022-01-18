import React from 'react'
import { Helmet } from 'react-helmet'
import ModuleList from './ModuleList'
import SubmoduleList from '../Submodules/SubmoduleList'
import BackBtn from '../react-components/BackBtn'

export default () => (
	<>
		<Helmet>
			<title>Botchikee - Modules</title>
		</Helmet>
		<BackBtn href="/">Settings</BackBtn>
		<div className="table-items-list">
			<div className="col s6">
				<ModuleList />
			</div>
			<div className="col s6">
				<SubmoduleList />		
			</div>
		</div>
	</>
)
