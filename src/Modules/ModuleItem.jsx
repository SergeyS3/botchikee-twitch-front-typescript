import React, { useState } from 'react'
import MaterializeSwitch from '../react_components/materialize/Switch'
import { Link } from 'react-router-dom'
import Chips from '../react_components/table_cols/Chips';
import Switch from "../react_components/table_cols/Switch";

const List = ({ list, active }) => 
	list.length
		? list.join(', ')
		: <div className={`grey-text text-${active ? 'darken' : 'lighten'}-1`}>*all*</div>

export default props => {
	const [module, setModules] = useState(props.module)
	const [focusedCol, setFocusedCol] = useState('')
	
	const setVal = (key, newVal) => {
		setModules(answer => {
			const curVal = answer[key]
			answer[key] = newVal
			
			if((newVal || key == 'active') && curVal.toString() != newVal.toString())
				props.onChange(answer)
			
			return {...answer}
		})
		setFocusedCol('')
	}
	
	const chipsAutocompleteOptions = {
		data: props.knownUsers.reduce((acc, user) => (acc[user] = null, acc), {}),
		limit: Infinity,
		minLength: 1
	}
	
	return (
		<tr className={module.active ? '' : 'grey-text text-lighten-1'}>
			<Switch
				defaultChecked={module.active}
				onChange={e => setVal('active', e.target.checked)}
			/>
			<td className="table-item-text-long">
				{module.name == 'Answer' ?
					<Link to={`/answers`}>{module.name}</Link>
				:
					module.name
				}
			</td>
			<Chips
				active={module.active}
				items={module.channels}
				autocompleteOptions={chipsAutocompleteOptions}
				hasFocus={focusedCol == 'channels'}
				onFocus={() => setFocusedCol('channels')}
				onBlur={channels => setVal('channels', channels)}
			/>
		</tr>
	)
}
