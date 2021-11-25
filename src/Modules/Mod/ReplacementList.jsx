import React, { useState, useEffect } from 'react'
import ItemListActions from '../../tools/item-actions/ItemListActions'
import MaterializePreloader from '../../react-components/materialize/Preloader'
import MaterializeBtn from '../../react-components/materialize/Btn'
import ReplacementItem from './ReplacementItem'

import './Replacements.css'

export default () => {
	let [replacements, setReplacements] = useState([])
	let [isReady, setIsReady] = useState(false)

	const itemListActions = new ItemListActions('mod-replacements', 'Replacement', setReplacements, setIsReady)
	
	const addReplacement = () => {
		itemListActions.add({
			key: +new Date(),
			from: '',
			to: '',
		})
	}
	const removeReplacement = replacement => itemListActions.remove(replacement)
	
	useEffect(() => {
		itemListActions.set()
	}, [])
	
	return (
		<>
			<h4>Replacements</h4>
			<MaterializePreloader ready={isReady}>
				<div className="mod-replacements">
					{replacements.map(replacement => {
						return (
							<ReplacementItem
								replacement={replacement}
								key={replacement.key}
								onRemove={removeReplacement}
							/>
						)
					})}
					<MaterializeBtn className="btn-small" onClick={addReplacement} />
				</div>
			</MaterializePreloader>
		</>
	)
}
