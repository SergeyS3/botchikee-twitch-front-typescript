import React from 'react'
import useTitle from '../hooks/useTitle'
import ModuleList from './ModuleList'
import SubmoduleList from '../Submodules/SubmoduleList'
import BackBtn from '../react-components/BackBtn'

export default () => {
	useTitle('Modules')
	
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
