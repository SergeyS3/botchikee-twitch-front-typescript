import React, { useState, useEffect } from 'react'
import ItemActions from '../../tools/item-actions/ItemActions'
import Switch from '../../react-components/table-cols/Switch'
import Text from '../../react-components/table-cols/Text'
import Chips from '../../react-components/table-cols/Chips'
import DeleteBtn from '../../react-components/table-cols/DeleteBtn'

export default props => {
	const [banWord, setBanWord] = useState(props.banWord)
	const [focusedCol, setFocusedCol] = useState('')
	
	const itemActions = new ItemActions(props.itemListActions, setBanWord, setFocusedCol, ['text'])
	
	useEffect(() => setBanWord(props.banWord), [props.banWord])
	
	return (
		<tr className={banWord.active ? '' : 'grey-text text-lighten-1'}>
			<Switch
				disabled={!banWord.id}
				checked={banWord.active}
				onChange={e => itemActions.setVal('active', e.target.checked)}
			/>
			<Text
				value={banWord.text}
				placeholder="*enter text*"
				long
				hasFocus={focusedCol === 'text'}
				onFocus={() => setFocusedCol('text')}
				onBlur={e => itemActions.setVal('text', e.target.value)}
			/>
			<Chips
				active={banWord.active}
				items={banWord.channels}
				hasFocus={focusedCol === 'channels'}
				onFocus={() => setFocusedCol('channels')}
				onBlur={users => itemActions.setVal('channels', users)}
			/>
			<DeleteBtn onClick={() => props.onRemove(banWord)} />
		</tr>
	)
}
