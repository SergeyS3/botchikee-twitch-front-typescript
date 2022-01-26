import React, { useState, useEffect, useMemo } from 'react'
import ItemListActions from '../../tools/item-actions/ItemListActions'
import BackBtn from '../../react-components/BackBtn'
import CommandItem from './CommandItem'
import MaterializePreloader from '../../react-components/materialize/Preloader'

export default () => {
	let [commands, setCommands] = useState([])
	let [isReady, setIsReady] = useState(false)
	
	const itemListActions = useMemo(() => new ItemListActions('commands', 'Commands', setCommands, setIsReady), [])
	
	useEffect(() => {
		document.title = 'Commands submodule settings'
		
		itemListActions.init()
		return () => itemListActions.destroy()
	}, [])
	
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
								itemListActions={itemListActions}
								command={command}
								key={command.key}
							/>
						))}
					</tbody>
				</table>
			</MaterializePreloader>
		</div>
	)
}
