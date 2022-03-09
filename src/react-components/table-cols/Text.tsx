import React, { FC, FocusEventHandler } from 'react'
import {Hover, HoverActive, HoverInactive} from '../Hover'

interface IProps {
	long?: boolean
	value: string
	hasFocus: boolean
	placeholder: string
	onFocus: FocusEventHandler
	onBlur: FocusEventHandler
}

const Text: FC<IProps> = props => (
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

export default Text
