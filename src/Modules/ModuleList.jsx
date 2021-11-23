import React, { useState, useEffect } from 'react'
import ItemListActions from '../tools/item-actions/ItemListActions'
import { Helmet } from 'react-helmet'
import ModuleItem from './ModuleItem'
import MaterializePreloader from '../react-components/materialize/Preloader'

export default () => {
	let [modules, setModules] = useState([])
	let [isReady, setIsReady] = useState(false)
	
	const itemListActions = new ItemListActions('modules', 'Module', setModules, setIsReady)
	
	const moduleSettingsPaths = {
		Answer: '/answers',
	}
	
	useEffect(() => {
		itemListActions.set()
	}, [])
	
	return (
		<div className="table-items-list">
			 
			<Helmet>
				<title>Botchikee - Modules</title>
			</Helmet>
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
							module.settingsPath = moduleSettingsPaths[module.name]
							
							return (
								<ModuleItem
									module={module}
									key={module.key}
								/>
							)
						})}
					</tbody>
				</table>
			</MaterializePreloader>
		</div>
	)
}
