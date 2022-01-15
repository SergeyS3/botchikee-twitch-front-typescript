import React, { useEffect, useState } from 'react'
import ItemActions from '../tools/item-actions/ItemActions'
import { Link } from 'react-router-dom'
import Switch from '../react-components/table-cols/Switch'

export default props => {
	const [submodule, setSubmodule] = useState(props.submodule)
	
	useEffect(() => {
		if(props.submodule !== submodule)
			setSubmodule(props.submodule)
	})
	
	return (
		<tr className={submodule.active ? '' : 'grey-text text-lighten-1'}>
			<Switch
				disabled={true}
				checked={submodule.active}
			/>
			<td className="table-item-text">
				{props.settingsPath ?
					<Link to={props.settingsPath}>{submodule.name}</Link>
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
