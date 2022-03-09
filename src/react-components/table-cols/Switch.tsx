import React, { FC, HTMLProps } from 'react'
import MaterializeSwitch from '../materialize/Switch'

import './Switch.css'

type IProps = HTMLProps<HTMLInputElement>

const Switch: FC<IProps> = props => (
	<td className="table-item-switch">
		<MaterializeSwitch {...props} />
	</td>
)

export default Switch
