import React from 'react'
import {Hover, HoverActive, HoverInactive} from '../Hover'
import MaterializeSelect from '../materialize/Select'

import './Select.css'

export default props => (
	<td className="table-item-select">
		<Hover hasFocus={props.hasFocus}>
			<HoverInactive>
				{props.value}
			</HoverInactive>
			<HoverActive>
				<MaterializeSelect
					defaultValue={props.value}
					options={props.options}
					onFocus={props.onFocus}
					onBlur={props.onBlur}
				/>
			</HoverActive>
		</Hover>
	</td>
)
