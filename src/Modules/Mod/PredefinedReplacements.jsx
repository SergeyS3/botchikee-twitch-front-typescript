import React, { useState, useEffect, useMemo } from 'react'
import ItemListActions from '../../tools/item-actions/ItemListActions'
import MaterializePreloader from '../../react-components/materialize/Preloader'

import './PredefinedReplacements.css'

export default () => {
	let [replacements, setReplacements] = useState([])
	let [isReady, setIsReady] = useState(false)
	let [showAll, setShowAll] = useState(false)
	
	const itemListActions = useMemo(() => new ItemListActions('mod-predefined-replacements', 'Predefined replacements', setReplacements, setIsReady), [])
	
	useEffect(() => {
		itemListActions.set()
	}, [])
	
	return (
		<>
			<h4>Predefined replacements</h4>
			<MaterializePreloader ready={isReady}>
				<div className={`mod-predefined-replacements ${showAll ? 'mod-predefined-replacements-all' : ''}`}>
					{replacements.map(replacement => (
						<div key={replacement.from + replacement.to}>
							{replacement.from} → {replacement.to}<br/>
						</div>
					))}
				</div>
				<a onClick={() => setShowAll(prev => !prev)}>{showAll ? 'hide' : 'show'} all</a>
			</MaterializePreloader>
		</>
	)
}
