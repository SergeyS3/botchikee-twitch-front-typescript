import React, { useState, useEffect } from 'react'
import ItemActions from '../../tools/item-actions/ItemActions'
import Switch from '../../react-components/table-cols/Switch'
import Chips from '../../react-components/table-cols/Chips'

export default props => {
	const [command, setCommand] = useState(props.command)
	const [focusedCol, setFocusedCol] = useState('')
	
	const itemActions = new ItemActions('commands', 'Command', setCommand, setFocusedCol)
	
	useEffect(() => {
		if(props.command !== command)
			setCommand(props.command)
	})
	
	return (
		<tr className={command.active ? '' : 'grey-text text-lighten-1'}>
			<Switch
				disabled={true}
				checked={command.active}
			/>
			<td className="table-item-text">
				{command.text}
			</td>
			<td className="table-item-text">
				{command.module}
			</td>
			<Chips
				active={command.active}
				long={true}
				items={command.users}
				userIcons={true}
				hasFocus={focusedCol === 'users'}
				onFocus={() => setFocusedCol('users')}
				onBlur={users => itemActions.setVal('users', users)}
			/>
		</tr>
	)
}
