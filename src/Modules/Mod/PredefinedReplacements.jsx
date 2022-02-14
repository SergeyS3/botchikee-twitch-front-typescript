import React, { useState } from 'react'
import useItemListActions from '../../hooks/useItemListActions'
import MaterializePreloader from '../../react-components/materialize/Preloader'

import './PredefinedReplacements.css'

export default () => {
	const [replacements, isReady] = useItemListActions('mod-predefined-replacements', 'Predefined replacements', false)
	const [showAll, setShowAll] = useState(false)
	
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
