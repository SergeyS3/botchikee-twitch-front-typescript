import React, { useState, useEffect } from 'react'
import ItemListActions from '../tools/item-actions/ItemListActions'
import ModuleItem from './ModuleItem'
import MaterializePreloader from '../react-components/materialize/Preloader'

export default () => {
	let [modules, setModules] = useState([])
	let [isReady, setIsReady] = useState(false)
	
	const itemListActions = new ItemListActions('modules', 'Module', setModules, setIsReady)
	
	const paths = {
		Answer: '/modules/answers',
		Mod: '/modules/mod',
	}
	
	useEffect(() => {
		itemListActions.init()
		
		return () => itemListActions.destroy()
	}, [])
	
	return (
		<>
			<h4>Modules</h4>
			<MaterializePreloader ready={isReady}>
				<table>
					<tbody>
						<tr>
							<th/>
							<th>Name</th>
							<th>Channels</th>
						</tr>
						{modules.map(module => (
							<ModuleItem
								module={module}
								path={paths[module.name]}
								key={module.key}
							/>
						))}
					</tbody>
				</table>
			</MaterializePreloader>
		</>
	)
}
