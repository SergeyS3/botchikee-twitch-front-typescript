import React, { useState, useEffect } from 'react'
import ItemListActions from '../../tools/item-actions/ItemListActions'
import { Helmet } from 'react-helmet'
import BackBtn from '../../react-components/BackBtn'
import AnswerItem from './AnswerItem'
import MaterializePreloader from '../../react-components/materialize/Preloader'
import MaterializeBtn from '../../react-components/materialize/Btn'

export default () => {
	let [answers, setAnswers] = useState([])
	let [isReady, setIsReady] = useState(false)
	
	const itemListActions = new ItemListActions('answers', 'Answer', setAnswers, setIsReady)
	
	const addAnswer = () => {
		itemListActions.add({
			key: +new Date(),
			active: false,
			type: 'command',
			text: '',
			answer: '',
			channels: [],
			users: []
		})
	}
	const removeAnswer = answer => itemListActions.remove(answer)
	
	useEffect(() => {
		itemListActions.set()
	}, [])
	
	return (
		<div className="table-items-list">
			<Helmet>
				<title>Botchikee - Answer module settings</title>
			</Helmet>
			<BackBtn href="/">Modules</BackBtn>
			<h4>Answers</h4>
			<MaterializePreloader ready={isReady}>
				<table>
					<tbody>
						<tr>
							<th/>
							<th>Type</th>
							<th>Text</th>
							<th>Answer</th>
							<th>Channels</th>
							<th>Users</th>
							<th/>
						</tr>
						{answers.map(answer => {
							return (
								<AnswerItem
									answer={answer}
									key={answer.key}
									onRemove={removeAnswer}
								/>
							)
						})}
					</tbody>
				</table>
				<MaterializeBtn className="btn-large table-item-add-btn" onClick={addAnswer} />
			</MaterializePreloader>
		</div>
	)
}
