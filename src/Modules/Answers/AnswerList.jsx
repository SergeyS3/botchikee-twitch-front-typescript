import React, { useState, useEffect, useMemo } from 'react'
import ItemListActions from '../../tools/item-actions/ItemListActions'
import BackBtn from '../../react-components/BackBtn'
import AnswerItem from './AnswerItem'
import MaterializePreloader from '../../react-components/materialize/Preloader'
import MaterializeBtn from '../../react-components/materialize/Btn'

export default () => {
	let [answers, setAnswers] = useState([])
	let [isReady, setIsReady] = useState(false)
	
	const itemListActions = useMemo(() => new ItemListActions('answers', 'Answer', setAnswers, setIsReady), [])
	
	const add = () => {
		itemListActions.add({
			active: false,
			type: 'command',
			text: '',
			answer: '',
			channels: [],
			users: []
		})
	}
	const remove = answer => itemListActions.remove(answer)
	
	useEffect(() => {
		document.title = 'Answer module settings'
		
		itemListActions.init()
		return () => itemListActions.destroy()
	}, [])
	
	return (
		<div className="table-items-list">
			<BackBtn href="/modules">Modules</BackBtn>
			<h4>Answers</h4>
			<MaterializePreloader ready={isReady}>
				<table>
					<tbody>
						<tr>
							<th className="table-item-switch"/>
							<th className="table-item-select">Type</th>
							<th className="table-item-text-edit">Text</th>
							<th className="table-item-text-edit table-item-text-edit-long">Answer</th>
							<th className="table-item-chips">Channels</th>
							<th className="table-item-chips">Users</th>
							<th className="table-item-delete"/>
						</tr>
						{answers.map(answer => (
							<AnswerItem
								itemListActions={itemListActions}
								answer={answer}
								key={answer.key}
								onRemove={remove}
							/>
						))}
					</tbody>
				</table>
				<MaterializeBtn className="btn-large table-item-add-btn" onClick={add} />
			</MaterializePreloader>
		</div>
	)
}
