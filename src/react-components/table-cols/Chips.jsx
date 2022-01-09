import React from 'react'
import {Hover, HoverActive, HoverInactive} from '../Hover'
import MaterializeChips from '../materialize/Chips'
import Tools from '../../tools/Tools';

import './Chips.css'

export default props => {
	const icons = []
	if(props.userIcons)
		icons.push('$broadcaster', '$mod')
	
	return (
		<td className="table-item-chips">
			<Hover hasFocus={props.hasFocus}>
				<HoverInactive>
					{props.items.length ?
						props.items.map(item => {
							let image
							if(icons.includes(item))
								image = `/images/chip-${item.substr(1)}.png`
							return (
								<span className="table-item-chips-value" key={item}>
									{image ? <img src={image} /> : item}
								</span>
							)
						})
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
							autocompleteOptions={{
								data: Tools.moveArrayValsToProps(icons),
								limit: Infinity,
								minLength: 1
							}}
						/>
					</span>
				</HoverActive>
			</Hover>
		</td>
	)
}
