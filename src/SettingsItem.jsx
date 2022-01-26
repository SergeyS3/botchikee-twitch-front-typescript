import React, { useState, useEffect } from 'react'
import Chips from './react-components/table-cols/Chips'
import ItemActions from './tools/item-actions/ItemActions'

export default props => {
	let [settings, setSettings] = useState(props.settings)
	const [focusedCol, setFocusedCol] = useState('')
	
	const itemActions = new ItemActions(props.itemListActions, setSettings, setFocusedCol)
	
	useEffect(() => setSettings(props.settings), [props.settings])
	
	return (
		<table>
			<tbody>
				<tr>
					<th>
						Connected channels:
					</th>
					<Chips
						active
						long
						emptyLabel={<div className="red-text text-accent-2">*add channels*</div>}
						items={settings.channels}
						hasFocus={focusedCol === 'channels'}
						onFocus={() => setFocusedCol('channels')}
						onBlur={channels => itemActions.setVal('channels', channels)}
					/>
				</tr>
			</tbody>
		</table>
	)
}
