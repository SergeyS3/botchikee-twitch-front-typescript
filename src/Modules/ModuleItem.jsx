import React, { useState } from 'react'
import ItemActions from '../tools/item-actions/ItemActions'
import { Link } from 'react-router-dom'
import Chips from '../react-components/table-cols/Chips'
import Switch from '../react-components/table-cols/Switch'

const List = ({ list, active }) => 
	list.length
		? list.join(', ')
		: <div className={`grey-text text-${active ? 'darken' : 'lighten'}-1`}>*all*</div>

export default props => {
	const [module, setModule] = useState(props.module)
	const [focusedCol, setFocusedCol] = useState('')
	
	const itemActions = new ItemActions('modules', 'Module', setModule, setFocusedCol)
	
	return (
		<tr className={module.active ? '' : 'grey-text text-lighten-1'}>
			<Switch
				defaultChecked={module.active}
				onChange={e => itemActions.setVal('active', e.target.checked)}
			/>
			<td className="table-item-text-long">
				{module.settingsPath ?
					<Link to={module.settingsPath}>{module.name}</Link>
				:
					module.name
				}
			</td>
			<Chips
				active={module.active}
				items={module.channels}
				hasFocus={focusedCol === 'channels'}
				onFocus={() => setFocusedCol('channels')}
				onBlur={channels => itemActions.setVal('channels', channels)}
			/>
		</tr>
	)
}
