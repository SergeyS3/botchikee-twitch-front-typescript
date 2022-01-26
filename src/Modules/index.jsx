import React, { useEffect } from 'react'
import ModuleList from './ModuleList'
import SubmoduleList from '../Submodules/SubmoduleList'
import BackBtn from '../react-components/BackBtn'

export default () => {
	useEffect(() => {
		document.title = 'Modules'
	}, [])
	
	return (
		<>
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
}
