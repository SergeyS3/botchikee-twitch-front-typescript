import React from 'react'
import {Hover, HoverActive, HoverInactive} from '../Hover'

export default props => (
	<td className={`table-item-text-edit ${props.long ? 'table-item-text-edit-long' : ''} ${props.value ? '' : 'red-text text-accent-2'}`}>
		<Hover hasFocus={props.hasFocus}>
			<HoverInactive>
				{props.value || props.placeholder}
			</HoverInactive>
			<HoverActive>
				<span className="z-depth-3">
					<input
						type="text"
						defaultValue={props.value}
						onFocus={props.onFocus}
						onBlur={props.onBlur}
					/>
				</span>
			</HoverActive>
		</Hover>
	</td>
)
