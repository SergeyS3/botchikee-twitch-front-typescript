import { ICommandItem } from '../../types'
import React, { FC } from 'react'
import useItemListActions from '../../hooks/useItemListActions'
import useTitle from '../../hooks/useTitle'
import BackBtn from '../../react-components/BackBtn'
import CommandItem from './CommandItem'
import MaterializePreloader from '../../react-components/materialize/Preloader'

const CommandList: FC = () => {
	const [commands, isReady, actions] = useItemListActions<ICommandItem>('commands', 'Commands')
	
	useTitle('Commands submodule settings')
	
	return (
		<div className="table-items-list col s6">
			<BackBtn href="/modules">Modules</BackBtn>
			<h4>Commands</h4>
			<MaterializePreloader ready={isReady}>
				<table>
					<tbody>
						<tr>
							<th className="table-item-switch"/>
							<th className="table-item-text">Text</th>
							<th className="table-item-text">Module</th>
							<th className="table-item-chips table-item-chips-long">Users</th>
						</tr>
						{commands.map(command => (
							<CommandItem
								save={actions.save}
								item={command}
								key={command.key}
							/>
						))}
					</tbody>
				</table>
			</MaterializePreloader>
		</div>
	)
}

export default CommandList
