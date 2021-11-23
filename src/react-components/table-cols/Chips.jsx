import React from 'react'
import {Hover, HoverActive, HoverInactive} from '../Hover'
import MaterializeChips from '../materialize/Chips'

export default props => (
	<td className="table-item-chips">
		<Hover hasFocus={props.hasFocus}>
			<HoverInactive>
				{props.items.length ?
					props.items.join(', ')
				:
					<div className={`grey-text text-${props.active ? 'darken' : 'lighten'}-1`}>*all*</div>
				}
			</HoverInactive>
			<HoverActive>
				<span className="z-depth-3">
					<MaterializeChips
						items={props.items}
						onFocus={props.onFocus}
						onBlur={props.onBlur}
						autocompleteOptions={props.autocompleteOptions}
					/>
				</span>
			</HoverActive>
		</Hover>
	</td>
)
