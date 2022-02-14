import React, { useState } from 'react'
import useItemActions from './hooks/useItemActions'
import Chips from './react-components/table-cols/Chips'

export default props => {
	const [settings, setVal] = useItemActions(props.save, props.settings)
	const [focusedCol, setFocusedCol] = useState('')
	
	const change = (...args) => {
		setVal(...args)
		setFocusedCol('')
	}
	
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
						onBlur={channels => change('channels', channels)}
					/>
				</tr>
			</tbody>
		</table>
	)
}
