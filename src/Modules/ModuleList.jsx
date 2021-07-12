import React, { useState, useEffect } from 'react'
import Tools from '../tools/Tools'
import ModuleItem from './ModuleItem'
import MaterializePreloader from '../react_components/materialize/Preloader'

import '../styles.css'

const apiUrl = '/api/modules'

export default () => {
	let [modules, setModules] = useState([])
	let [isReady, setIsReady] = useState(false)
	
	const changeModule = async module => {
		const res = await Tools.fetch(`${apiUrl}/${module.id}`, 'PUT', module)
		
		if(res.status != 200)
			M.toast({html: 'module not saved'})
		else
			M.toast({html: 'module saved'})
	}

	const knownUsers = ['airchikee']
	
	useEffect(() => {
		(async () => {
			const res = await fetch(apiUrl)
			modules = await res.json()
			
			setModules(modules)
			setIsReady(true)
		})()
	}, [])
	
	return (
		<div className="table-items-list">
			<h4>Modules</h4>
			<MaterializePreloader ready={isReady}>
				<table className="module-list">
					<tbody>
						<tr>
							<th/>
							<th>Name</th>
							<th>Channels</th>
						</tr>
						{modules.map(module => {
							return <ModuleItem
								module={module}
								key={module.id}
								onChange={changeModule}
								knownUsers={knownUsers}
							/>
						})}
					</tbody>
				</table>
			</MaterializePreloader>
		</div>
	)
}
