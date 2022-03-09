import { IItemComponentProps, IModReplacementItem, SetItemVal } from '../../types'
import React, { FC, FocusEvent, memo, useState } from 'react'
import useItemActions from '../../hooks/useItemActions'
import { Hover, HoverActive } from '../../react-components/Hover'

type T = IModReplacementItem

const ReplacementItem: FC<IItemComponentProps<T>> = props => {
	const [replacement, setVal] = useItemActions(props.save, props.item, ['from'])
	const [focusedCol, setFocusedCol] = useState('')
	
	const change: SetItemVal<T> = (...args) => {
		setVal(...args)
		setFocusedCol('')
	}
	
	const getDisplayText = (text: string) => {
		let className: string
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
			<Hover hasFocus={!!focusedCol}>
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
						onBlur={(e: FocusEvent<HTMLInputElement>) => change('from', e.target.value)}
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
}

export default memo(ReplacementItem)
