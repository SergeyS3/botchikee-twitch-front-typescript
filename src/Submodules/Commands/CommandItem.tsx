import { ICommandItem, IItemComponentProps, SetItemVal } from '../../types'
import React, { FC, memo, useState } from 'react'
import useItemActions from '../../hooks/useItemActions'
import Switch from '../../react-components/table-cols/Switch'
import Chips from '../../react-components/table-cols/Chips'

type T = ICommandItem

const AnswerItem: FC<IItemComponentProps<T>> = props => {
	const [command, setVal] = useItemActions<ICommandItem>(props.save, props.item)
	const [focusedCol, setFocusedCol] = useState('')
	
	const change: SetItemVal<T> = (...args) => {
		setVal(...args)
		setFocusedCol('')
	}
	
	return (
		<tr className={command.active ? '' : 'grey-text text-lighten-1'}>
			<Switch
				disabled
				checked={command.active}
			/>
			<td className="table-item-text">
				{command.text}
			</td>
			<td className="table-item-text">
				{command.module}
			</td>
			<Chips
				active={command.active}
				long
				items={command.users}
				userIcons
				hasFocus={focusedCol === 'users'}
				onFocus={() => setFocusedCol('users')}
				onBlur={users => change('users', users)}
			/>
		</tr>
	)
}

export default memo(AnswerItem)
