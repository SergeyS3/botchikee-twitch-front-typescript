import React, { memo, useState } from 'react'
import useItemActions from '../../hooks/useItemActions'
import { Hover, HoverActive } from '../../react-components/Hover'

export default memo(props => {
	const [replacement, setVal] = useItemActions(props.save, props.replacement, ['from'])
	const [focusedCol, setFocusedCol] = useState('')
	
	const change = (...args) => {
		setVal(...args)
		setFocusedCol('')
	}
	
	const getDisplayText = text => {
		let className
		if(!text) {
			className = 'grey-text'
			text = '<empty>'
		}
		else if(/^[а-яА-я]$/.test(text))
			className = 'orange-text'

		return <span {...{className}}>{text}</span>
	}
	
	return (
		<div className="mod-replacement">
			<Hover hasFocus={focusedCol}>
				<div className="mod-replacement-text">
					<span>{getDisplayText(replacement.from)}</span>
					→
					<span>{getDisplayText(replacement.to)}</span>
				</div>
				<HoverActive className="mod-replacement-edit z-depth-3">
					<input
						type="text"
						className="mod-replacement-edit-from"
						defaultValue={replacement.from}
						onFocus={() => setFocusedCol('from')}
						onBlur={e => change('from', e.target.value)}
					/>
					→
					<input
						type="text"
						className="mod-replacement-edit-to"
						defaultValue={replacement.to}
						onFocus={() => setFocusedCol('to')}
						onBlur={e => change('to', e.target.value)}
					/>
					<i className="material-icons red-text item-delete" onClick={() => props.onRemove(replacement)}>delete</i>
				</HoverActive>
			</Hover>
		</div>
	)
})
