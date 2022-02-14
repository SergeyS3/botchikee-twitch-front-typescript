import React, { useState } from 'react'
import useItemActions from '../hooks/useItemActions'
import { Link } from 'react-router-dom'
import Chips from '../react-components/table-cols/Chips'
import Switch from '../react-components/table-cols/Switch'

export default props => {
	const [module, setVal] = useItemActions(props.save, props.module)
	const [focusedCol, setFocusedCol] = useState('')
	
	const change = (...args) => {
		setVal(...args)
		setFocusedCol('')
	}
	
	return (
		<tr className={module.active ? '' : 'grey-text text-lighten-1'}>
			<Switch
				checked={module.active}
				onChange={e => change('active', e.target.checked)}
			/>
			<td className="table-item-text">
				{props.path ?
					<Link to={props.path}>{module.name}</Link>
				:
					module.name
				}
			</td>
			<Chips
				active={module.active}
				long
				items={module.channels}
				hasFocus={focusedCol === 'channels'}
				onFocus={() => setFocusedCol('channels')}
				onBlur={channels => change('channels', channels)}
			/>
		</tr>
	)
}
