import React, { memo, useState } from 'react'
import useItemActions from '../../hooks/useItemActions'
import Switch from '../../react-components/table-cols/Switch'
import Text from '../../react-components/table-cols/Text'
import Chips from '../../react-components/table-cols/Chips'
import DeleteBtn from '../../react-components/table-cols/DeleteBtn'

export default memo(props => {
	const [banWord, setVal] = useItemActions(props.save, props.banWord, ['text'])
	const [focusedCol, setFocusedCol] = useState('')
	
	const change = (...args) => {
		setVal(...args)
		setFocusedCol('')
	}
	
	return (
		<tr className={banWord.active ? '' : 'grey-text text-lighten-1'}>
			<Switch
				disabled={!banWord.id}
				checked={banWord.active}
				onChange={e => change('active', e.target.checked)}
			/>
			<Text
				value={banWord.text}
				placeholder="*enter text*"
				long
				hasFocus={focusedCol === 'text'}
				onFocus={() => setFocusedCol('text')}
				onBlur={e => change('text', e.target.value)}
			/>
			<Chips
				active={banWord.active}
				items={banWord.channels}
				hasFocus={focusedCol === 'channels'}
				onFocus={() => setFocusedCol('channels')}
				onBlur={users => change('channels', users)}
			/>
			<DeleteBtn onClick={() => props.onRemove(banWord)} />
		</tr>
	)
})
