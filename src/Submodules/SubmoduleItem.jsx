import React  from 'react'
import useItemState from '../hooks/useItemState'
import { Link } from 'react-router-dom'
import Switch from '../react-components/table-cols/Switch'

export default props => {
	const [submodule] = useItemState(props.submodule)
	
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
