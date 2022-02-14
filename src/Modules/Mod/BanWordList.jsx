import React from 'react'
import useItemListActions from '../../hooks/useItemListActions'
import BanWordItem from './BanWordItem'
import MaterializePreloader from '../../react-components/materialize/Preloader'
import MaterializeBtn from '../../react-components/materialize/Btn'

export default () => {
	const [banWords, isReady, actions] = useItemListActions('mod-ban-words', 'Ban word')
	
	const add = () => {
		actions.add({
			active: false,
			text: '',
			channels: [],
		})
	}
	
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
								save={actions.save}
								banWord={banWord}
								key={banWord.key}
								onRemove={actions.remove}
							/>
						))}
					</tbody>
				</table>
				<MaterializeBtn className="btn-large table-item-add-btn" onClick={add} />
			</MaterializePreloader>
		</>
	)
}
