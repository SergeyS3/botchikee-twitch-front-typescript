import React, { useState, useEffect } from 'react'
import BanWordItem from './BanWordItem'
import MaterializePreloader from '../../react-components/materialize/Preloader'
import MaterializeBtn from '../../react-components/materialize/Btn'
import ItemListActions from "../../tools/item-actions/ItemListActions";

export default () => {
	let [banWords, setBanWord] = useState([])
	let [isReady, setIsReady] = useState(false)
	
	const itemListActions = new ItemListActions('mod-ban-words', 'Ban word', setBanWord, setIsReady)
	
	const addBanWord = () => {
		itemListActions.add({
			key: +new Date(),
			active: false,
			text: '',
			channels: [],
		})
	}
	const removeAnswer = banWord => itemListActions.remove(banWord)
	
	useEffect(() => {
		itemListActions.set()
	}, [])
	
	return (
		<>
			<h4>Ban words</h4>
			<MaterializePreloader ready={isReady}>
				<table className="table50p">
					<tbody>
						<tr>
							<th/>
							<th>Text</th>
							<th>Channels</th>
							<th/>
						</tr>
						{banWords.map(banWord => {
							return (
								<BanWordItem
									banWord={banWord}
									key={banWord.key}
									onRemove={removeAnswer}
								/>
							)
						})}
					</tbody>
				</table>
				<MaterializeBtn className="btn-large table-item-add-btn" onClick={addBanWord} />
			</MaterializePreloader>
		</>
	)
}
