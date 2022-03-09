import { IModuleItem, IItemComponentProps, SetItemVal } from '../types'
import React, { ChangeEvent, FC, useState } from 'react'
import useItemActions  from '../hooks/useItemActions'
import { Link } from 'react-router-dom'
import Chips from '../react-components/table-cols/Chips'
import Switch from '../react-components/table-cols/Switch'

type T = IModuleItem

interface Props<T> extends IItemComponentProps<T> {
	path: string
}

const ModuleItem: FC<Props<T>> = props => {
	const [module, setVal] = useItemActions(props.save, props.item)
	const [focusedCol, setFocusedCol] = useState('')
	
	const change: SetItemVal<T> = (...args) => {
		setVal(...args)
		setFocusedCol('')
	}
	
	return (
		<tr className={module.active ? '' : 'grey-text text-lighten-1'}>
			<Switch
				checked={module.active}
				onChange={(e: ChangeEvent<HTMLInputElement>) => change('active', e.target.checked)}
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

export default ModuleItem
