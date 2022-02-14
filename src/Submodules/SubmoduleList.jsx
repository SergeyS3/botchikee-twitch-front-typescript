import React from 'react'
import useItemListActions from '../hooks/useItemListActions'
import SubmoduleItem from './SubmoduleItem'
import MaterializePreloader from '../react-components/materialize/Preloader'

export default () => {
	const [submodules, isReady] = useItemListActions('submodules', 'Submodule')
	
	const paths = {
		CommandMsg: '/submodules/commands',
	}
	
	return (
		<>
			<h4>Submodules</h4>
			<MaterializePreloader ready={isReady}>
				<table>
					<tbody>
						<tr>
							<th className="table-item-switch"/>
							<th className="table-item-text">Name</th>
							<th>Parent modules</th>
						</tr>
						{submodules.map(submodule => (
							<SubmoduleItem
								submodule={submodule}
								path={paths[submodule.name]}
								key={submodule.key}
							/>
						))}
					</tbody>
				</table>
			</MaterializePreloader>
		</>
	)
}
