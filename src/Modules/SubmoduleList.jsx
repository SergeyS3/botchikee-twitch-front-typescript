import React, { useState, useEffect } from 'react'
import ItemListActions from '../tools/item-actions/ItemListActions'
import SubmoduleItem from './SubmoduleItem'
import MaterializePreloader from '../react-components/materialize/Preloader'

export default () => {
	let [submodules, setSubmodules] = useState([])
	let [isReady, setIsReady] = useState(false)
	
	const itemListActions = new ItemListActions('submodules', 'Submodule', setSubmodules, setIsReady)
	
	const submoduleSettingsPaths = {
		CommandMsg: '/commands',
	}
	
	useEffect(() => {
		itemListActions.init()
		
		return () => itemListActions.destroy()
	}, [])
	
	return (
		<>
			<h4>Submodules</h4>
			<MaterializePreloader ready={isReady}>
				<table>
					<tbody>
						<tr>
							<th/>
							<th>Name</th>
							<th>Parent modules</th>
						</tr>
						{submodules.map(submodule => (
							<SubmoduleItem
								submodule={submodule}
								settingsPath={submoduleSettingsPaths[submodule.name]}
								key={submodule.key}
							/>
						))}
					</tbody>
				</table>
			</MaterializePreloader>
		</>
	)
}
