import React, { FC } from 'react'
import useItemListActions from '../hooks/useItemListActions'
import SubmoduleItem from './SubmoduleItem'
import MaterializePreloader from '../react-components/materialize/Preloader'
import { ISubmoduleItem } from '../types'

interface IPaths {
	[key: string]: string
}

const SubmoduleList: FC = () => {
	const [submodules, isReady] = useItemListActions<ISubmoduleItem>('submodules', 'Submodule')
	
	const paths: IPaths = {
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
								item={submodule}
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

export default SubmoduleList
