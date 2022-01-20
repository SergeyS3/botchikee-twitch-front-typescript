import React, { useState, useEffect, useMemo } from 'react'
import ItemListActions from '../../tools/item-actions/ItemListActions'
import MaterializePreloader from '../../react-components/materialize/Preloader'
import MaterializeBtn from '../../react-components/materialize/Btn'
import ReplacementItem from './ReplacementItem'

import './Replacements.css'

export default () => {
	let [replacements, setReplacements] = useState([])
	let [isReady, setIsReady] = useState(false)
	
	const itemListActions = useMemo(() => new ItemListActions('mod-replacements', 'Replacement', setReplacements, setIsReady), [])
	
	const add = () => {
		itemListActions.add({
			key: +new Date,
			from: '',
			to: '',
		})
	}
	const remove = replacement => itemListActions.remove(replacement)
	
	useEffect(() => {
		itemListActions.init()
		
		return () => itemListActions.destroy()
	}, [])
	
	return (
		<>
			<h4>Replacements</h4>
			<MaterializePreloader ready={isReady}>
				<div className="mod-replacements">
					{replacements.map(replacement => (
						<ReplacementItem
							itemListActions={itemListActions}
							replacement={replacement}
							key={replacement.key}
							onRemove={remove}
						/>
					))}
					<MaterializeBtn className="btn-small" onClick={add} />
				</div>
			</MaterializePreloader>
		</>
	)
}
