import React, { useState, useEffect } from 'react'
import ItemListActions from '../../tools/item-actions/ItemListActions'
import { Helmet } from 'react-helmet'
import BackBtn from '../../react-components/BackBtn'
import CommandItem from './CommandItem'
import MaterializePreloader from '../../react-components/materialize/Preloader'

export default () => {
	let [commands, setCommands] = useState([])
	let [isReady, setIsReady] = useState(false)
	
	const itemListActions = new ItemListActions('commands', 'Command', setCommands, setIsReady)
	
	useEffect(() => {
		itemListActions.init()
		
		return () => itemListActions.destroy()
	}, [])
	
	return (
		<div className="table-items-list col s6">
			<Helmet>
				<title>Botchikee - Commands</title>
			</Helmet>
			<BackBtn href="/modules">Modules</BackBtn>
			<h4>Commands</h4>
			<MaterializePreloader ready={isReady}>
				<table>
					<tbody>
						<tr>
							<th/>
							<th>Text</th>
							<th>Module</th>
							<th>Users</th>
						</tr>
						{commands.map(command => (
							<CommandItem
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
