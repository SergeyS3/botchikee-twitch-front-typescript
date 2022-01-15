import React, { useState, useEffect } from 'react'
import ItemActions from '../tools/item-actions/ItemActions'
import { Link } from 'react-router-dom'
import Chips from '../react-components/table-cols/Chips'
import Switch from '../react-components/table-cols/Switch'

export default props => {
	const [module, setModule] = useState(props.module)
	const [focusedCol, setFocusedCol] = useState('')
	
	const itemActions = new ItemActions('modules', 'Module', setModule, setFocusedCol)
	
	useEffect(() => {
		if(props.module !== module)
			setModule(props.module)
	})
	
	return (
		<tr className={module.active ? '' : 'grey-text text-lighten-1'}>
			<Switch
				checked={module.active}
				onChange={e => itemActions.setVal('active', e.target.checked)}
			/>
			<td className="table-item-text">
				{props.settingsPath ?
					<Link to={props.settingsPath}>{module.name}</Link>
				:
					module.name
				}
			</td>
			<Chips
				active={module.active}
				long={true}
				items={module.channels}
				hasFocus={focusedCol === 'channels'}
				onFocus={() => setFocusedCol('channels')}
				onBlur={channels => itemActions.setVal('channels', channels)}
			/>
		</tr>
	)
}
