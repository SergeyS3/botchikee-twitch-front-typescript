import React, { FC } from 'react'
import {Hover, HoverActive, HoverInactive} from '../Hover'
import MaterializeSelect, { IProps as IMaterializeSelectProps } from '../materialize/Select'

import './Select.css'

interface IProps extends Omit<IMaterializeSelectProps, 'defaultValue'> {
	hasFocus: boolean
	value: string
}

const Select: FC<IProps> = props => (
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

export default Select
