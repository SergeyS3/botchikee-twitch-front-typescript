import React, { useState } from 'react'
import Switch from '../../react_components/table_cols/Switch'
import Select from '../../react_components/table_cols/Select';
import Text from '../../react_components/table_cols/Text';
import Chips from '../../react_components/table_cols/Chips'

export default props => {
	const [answer, setAnswer] = useState(props.answer)
	const [focusedCol, setFocusedCol] = useState('')
	
	const setVal = (key, newVal) => {
		setAnswer(answer => {
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
		<tr className={answer.active ? '' : 'grey-text text-lighten-1'}>
			<Switch
				disabled={!answer.id}
				defaultChecked={answer.active}
				onChange={e => setVal('active', e.target.checked)}
			/>
			<Select
				value={answer.type}
				options={[
					{value: 'command', text: 'command'},
					{value: 'message', text: 'message'},
					{value: 'substring', text: 'substring'},
				]}
				hasFocus={focusedCol == 'type'}
				onFocus={() => setFocusedCol('type')}
				onBlur={value => setVal('type', value)}
			/>
			<Text
				value={answer.text}
				placeholder="*enter text*"
				hasFocus={focusedCol == 'text'}
				onFocus={() => setFocusedCol('text')}
				onBlur={e => setVal('text', e.target.value)}
			/>
			<Text
				value={answer.answer}
				placeholder="*enter answer*"
				long={true}
				hasFocus={focusedCol == 'answer'}
				onFocus={() => setFocusedCol('answer')}
				onBlur={e => setVal('answer', e.target.value)}
			/>
			<Chips
				active={answer.active}
				items={answer.channels}
				autocompleteOptions={chipsAutocompleteOptions}
				hasFocus={focusedCol == 'channels'}
				onFocus={() => setFocusedCol('channels')}
				onBlur={channels => setVal('channels', channels)}
			/>
			<Chips
				active={answer.active}
				items={answer.users}
				autocompleteOptions={chipsAutocompleteOptions}
				hasFocus={focusedCol == 'users'}
				onFocus={() => setFocusedCol('users')}
				onBlur={users => setVal('users', users)}
			/>
			<td className="table-item-delete">
				<i className="material-icons red-text" onClick={() => props.onRemove(props.answer)}>delete</i>
			</td>
		</tr>
	)
}
