import { ISettingsItem, IItemComponentProps, SetItemVal } from './types'
import React, { FC, useState } from 'react'
import useItemActions  from './hooks/useItemActions'
import Chips from './react-components/table-cols/Chips'

type T = ISettingsItem

const SettingsItem: FC<IItemComponentProps<T>> = props => {
	const [settings, setVal] = useItemActions<T>(props.save, props.item)
	const [focusedCol, setFocusedCol] = useState('')
	
	const change: SetItemVal<T> = (...args) => {
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

export default SettingsItem
