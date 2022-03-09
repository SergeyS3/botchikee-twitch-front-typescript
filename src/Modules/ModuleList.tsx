import { IModuleItem } from '../types'
import React, { FC } from 'react'
import useItemListActions from '../hooks/useItemListActions'
import ModuleItem from './ModuleItem'
import MaterializePreloader from '../react-components/materialize/Preloader'

interface IPaths {
	[key: string]: string
}

const ModuleList: FC = () => {
	const [modules, isReady, actions] = useItemListActions<IModuleItem>('modules', 'Module')
	
	const paths: IPaths = {
		Answer: '/modules/answers',
		Mod: '/modules/mod',
	}
	
	return (
		<>
			<h4>Modules</h4>
			<MaterializePreloader ready={isReady}>
				<table>
					<tbody>
						<tr>
							<th className="table-item-switch"/>
							<th className="table-item-text">Name</th>
							<th className="table-item-chips table-item-chips-long">Channels</th>
						</tr>
						{modules.map(module => (
							<ModuleItem
								save={actions.save}
								item={module}
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

export default ModuleList
