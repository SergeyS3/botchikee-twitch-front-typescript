import React, { memo, useState } from 'react'
import useItemActions from '../../hooks/useItemActions'
import Switch from '../../react-components/table-cols/Switch'
import Select from '../../react-components/table-cols/Select'
import Text from '../../react-components/table-cols/Text'
import Chips from '../../react-components/table-cols/Chips'
import DeleteBtn from '../../react-components/table-cols/DeleteBtn'

export default memo(props => {
	const [answer, setVal] = useItemActions(props.save, props.answer, ['text', 'answer'])
	const [focusedCol, setFocusedCol] = useState('')

	const change = (...args) => {
		setVal(...args)
		setFocusedCol('')
	}
	
	return (
		<tr className={answer.active ? '' : 'grey-text text-lighten-1'}>
			<Switch
				disabled={!answer.id}
				checked={answer.active}
				onChange={e => change('active', e.target.checked)}
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
				onBlur={value => change('type', value)}
			/>
			<Text
				value={answer.text}
				placeholder="*enter text*"
				hasFocus={focusedCol === 'text'}
				onFocus={() => setFocusedCol('text')}
				onBlur={e => change('text', e.target.value)}
			/>
			<Text
				value={answer.answer}
				placeholder="*enter answer*"
				long
				hasFocus={focusedCol === 'answer'}
				onFocus={() => setFocusedCol('answer')}
				onBlur={e => change('answer', e.target.value)}
			/>
			<Chips
				active={answer.active}
				items={answer.channels}
				hasFocus={focusedCol === 'channels'}
				onFocus={() => setFocusedCol('channels')}
				onBlur={channels => change('channels', channels)}
			/>
			<Chips
				active={answer.active}
				items={answer.users}
				userIcons
				hasFocus={focusedCol === 'users'}
				onFocus={() => setFocusedCol('users')}
				onBlur={users => change('users', users)}
			/>
			<DeleteBtn onClick={() => props.onRemove(answer)} />
		</tr>
	)
})
