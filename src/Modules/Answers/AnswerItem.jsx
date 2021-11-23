import React, { useState } from 'react'
import ItemActions from '../../tools/item-actions/ItemActions'
import Switch from '../../react-components/table-cols/Switch'
import Select from '../../react-components/table-cols/Select'
import Text from '../../react-components/table-cols/Text'
import Chips from '../../react-components/table-cols/Chips'

export default props => {
	const [answer, setAnswer] = useState(props.answer)
	const [focusedCol, setFocusedCol] = useState('')
	
	const itemActions = new ItemActions('answers', 'Answer', setAnswer, setFocusedCol, ['text', 'answer'])
	
	return (
		<tr className={answer.active ? '' : 'grey-text text-lighten-1'}>
			<Switch
				disabled={!answer.id}
				defaultChecked={answer.active}
				onChange={e => itemActions.setVal('active', e.target.checked)}
			/>
			<Select
				value={answer.type}
				options={[
					{value: 'command', text: 'command'},
					{value: 'message', text: 'message'},
					{value: 'substring', text: 'substring'},
				]}
				hasFocus={focusedCol === 'type'}
				onFocus={() => setFocusedCol('type')}
				onBlur={value => itemActions.setVal('type', value)}
			/>
			<Text
				value={answer.text}
				placeholder="*enter text*"
				hasFocus={focusedCol === 'text'}
				onFocus={() => setFocusedCol('text')}
				onBlur={e => itemActions.setVal('text', e.target.value)}
			/>
			<Text
				value={answer.answer}
				placeholder="*enter answer*"
				long={true}
				hasFocus={focusedCol === 'answer'}
				onFocus={() => setFocusedCol('answer')}
				onBlur={e => itemActions.setVal('answer', e.target.value)}
			/>
			<Chips
				active={answer.active}
				items={answer.channels}
				hasFocus={focusedCol === 'channels'}
				onFocus={() => setFocusedCol('channels')}
				onBlur={channels => itemActions.setVal('channels', channels)}
			/>
			<Chips
				active={answer.active}
				items={answer.users}
				hasFocus={focusedCol === 'users'}
				onFocus={() => setFocusedCol('users')}
				onBlur={users => itemActions.setVal('users', users)}
			/>
			<td className="table-item-delete item-delete">
				<i className="material-icons red-text" onClick={() => props.onRemove(answer)}>delete</i>
			</td>
		</tr>
	)
}
