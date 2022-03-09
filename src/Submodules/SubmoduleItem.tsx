import { IItemComponentProps, ISubmoduleItem } from '../types'
import React, { FC, memo } from 'react'
import useItemState from '../hooks/useItemState'
import { Link } from 'react-router-dom'
import Switch from '../react-components/table-cols/Switch'

type T = ISubmoduleItem

interface Props<T> extends IItemComponentProps<T> {
	path: string
}

const SubmoduleItem: FC<Props<T>> = props => {
	const [submodule] = useItemState<T>(props.item)
	
	return (
		<tr className={submodule.active ? '' : 'grey-text text-lighten-1'}>
			<Switch
				disabled
				checked={submodule.active}
			/>
			<td className="table-item-text">
				{props.path ?
					<Link to={props.path}>{submodule.name}</Link>
				:
					submodule.name
				}
			</td>
			<td>
				{submodule.modules.sort().map(item => (
					<span className="table-item-list-value" key={item}>
						{item}
					</span>
				))}
			</td>
		</tr>
	)
}

export default memo(SubmoduleItem)
