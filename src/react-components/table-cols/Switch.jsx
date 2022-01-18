import React from 'react'
import MaterializeSwitch from '../materialize/Switch'

import './Switch.css'

export default props => (
	<td className="table-item-switch">
		<MaterializeSwitch {...props} />
	</td>
)
