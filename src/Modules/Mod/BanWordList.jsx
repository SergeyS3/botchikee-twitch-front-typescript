import React, { useState, useEffect, useMemo } from 'react'
import BanWordItem from './BanWordItem'
import MaterializePreloader from '../../react-components/materialize/Preloader'
import MaterializeBtn from '../../react-components/materialize/Btn'
import ItemListActions from '../../tools/item-actions/ItemListActions'

export default () => {
	let [banWords, setBanWord] = useState([])
	let [isReady, setIsReady] = useState(false)
	
	const itemListActions = useMemo(() => new ItemListActions('mod-ban-words', 'Ban word', setBanWord, setIsReady), [])
	
	const add = () => {
		itemListActions.add({
			key: +new Date,
			active: false,
			text: '',
			channels: [],
		})
	}
	const remove = banWord => itemListActions.remove(banWord)
	
	useEffect(() => {
		itemListActions.init()
		
		return () => itemListActions.destroy()
	}, [])
	
	return (
		<>
			<h4>Ban words</h4>
			<MaterializePreloader ready={isReady}>
				<table>
					<tbody>
						<tr>
							<th className="table-item-switch"/>
							<th className="table-item-text-edit table-item-text-edit-long">Text</th>
							<th className="table-item-chips">Channels</th>
							<th className="table-item-delete"/>
						</tr>
						{banWords.map(banWord => (
							<BanWordItem
								itemListActions={itemListActions}
								banWord={banWord}
								key={banWord.key}
								onRemove={remove}
							/>
						))}
					</tbody>
				</table>
				<MaterializeBtn className="btn-large table-item-add-btn" onClick={add} />
			</MaterializePreloader>
		</>
	)
}
