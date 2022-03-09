import { IModReplacementItem } from '../../types'
import React from 'react'
import useItemListActions from '../../hooks/useItemListActions'
import MaterializePreloader from '../../react-components/materialize/Preloader'
import MaterializeBtn from '../../react-components/materialize/Btn'
import ReplacementItem from './ReplacementItem'

import './Replacements.css'

type T = IModReplacementItem

export default () => {
	const [replacements, isReady, actions] = useItemListActions<IModReplacementItem>('mod-replacements', 'Replacement')
	
	const add = () => {
		actions.add({
			from: '',
			to: '',
		})
	}
	
	return (
		<>
			<h4>Replacements</h4>
			<MaterializePreloader ready={isReady}>
				<div className="mod-replacements">
					{replacements.map(replacement => (
						<ReplacementItem
							save={actions.save}
							item={replacement}
							key={replacement.key}
							onRemove={actions.remove}
						/>
					))}
					<MaterializeBtn className="btn-small" onClick={add} />
				</div>
			</MaterializePreloader>
		</>
	)
}
