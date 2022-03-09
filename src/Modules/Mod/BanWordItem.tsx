import { IModBanWordItem, IItemComponentProps, SetItemVal } from '../../types'
import React, { ChangeEvent, FC, FocusEvent, memo, useState } from 'react'
import useItemActions from '../../hooks/useItemActions'
import Switch from '../../react-components/table-cols/Switch'
import Text from '../../react-components/table-cols/Text'
import Chips from '../../react-components/table-cols/Chips'
import DeleteBtn from '../../react-components/table-cols/DeleteBtn'

type T = IModBanWordItem

const BanWordItem: FC<IItemComponentProps<T>> = props => {
	const [banWord, setVal] = useItemActions<T>(props.save, props.item, ['text'])
	const [focusedCol, setFocusedCol] = useState('')
	
	const change: SetItemVal<T> = (...args) => {
		setVal(...args)
		setFocusedCol('')
	}
	
	return (
		<tr className={banWord.active ? '' : 'grey-text text-lighten-1'}>
			<Switch
				disabled={!banWord.id}
				checked={banWord.active}
				onChange={(e: ChangeEvent<HTMLInputElement>) => change('active', e.target.checked)}
			/>
			<Text
				value={banWord.text}
				placeholder="*enter text*"
				long
				hasFocus={focusedCol === 'text'}
				onFocus={() => setFocusedCol('text')}
				onBlur={(e: FocusEvent<HTMLInputElement>) => change('text', e.target.value)}
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
}

export default memo(BanWordItem)
