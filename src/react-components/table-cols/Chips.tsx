import React, { FC, ReactNode } from 'react'
import { Hover, HoverActive, HoverInactive } from '../Hover'
import MaterializeChips from '../materialize/Chips'
import { moveArrayValsToProps } from '../../tools'

interface IProps {
	active: boolean
	long?: boolean
	hasFocus: boolean
	items: string[]
	onFocus: Function
	onBlur: (items: string[]) => any
	userIcons?: boolean
	emptyLabel?: ReactNode
}

const Chips: FC<IProps> = props => {
	const icons: string[] = []
	if(props.userIcons)
		icons.push('$broadcaster', '$mod')
	
	return (
		<td className={`table-item-chips ${props.long ? 'table-item-chips-long' : ''}`}>
			<Hover hasFocus={props.hasFocus}>
				<HoverInactive>
					{props.items.length ?
						props.items.map(item => {
							let image
							if(icons.includes(item))
								image = `/images/chip-${item.substr(1)}.png`
							return (
								<span className="table-item-list-value" key={item}>
									{image ? <img src={image} /> : item}
								</span>
							)
						})
					:
						props.emptyLabel
						|| <div className={`grey-text text-${props.active ? 'darken' : 'lighten'}-1`}>*all*</div>
					}
				</HoverInactive>
				<HoverActive>
					<span className="z-depth-3">
						<MaterializeChips
							items={props.items}
							onFocus={props.onFocus}
							onBlur={props.onBlur}
							autocompleteOptions={{
								data: moveArrayValsToProps(icons),
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

export default Chips