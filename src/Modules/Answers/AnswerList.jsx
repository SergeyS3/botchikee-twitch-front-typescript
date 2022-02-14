import React  from 'react'
import useItemListActions from '../../hooks/useItemListActions'
import useTitle from '../../hooks/useTitle'
import BackBtn from '../../react-components/BackBtn'
import AnswerItem from './AnswerItem'
import MaterializePreloader from '../../react-components/materialize/Preloader'
import MaterializeBtn from '../../react-components/materialize/Btn'

export default () => {
	const [answers, isReady, actions] = useItemListActions('answers', 'Answer')
	
	const add = () => {
		actions.add({
			active: false,
			type: 'command',
			text: '',
			answer: '',
			channels: [],
			users: []
		})
	}
	
	useTitle('Answer module settings')
	
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
								save={actions.save}
								answer={answer}
								key={answer.key}
								onRemove={actions.remove}
							/>
						))}
					</tbody>
				</table>
				<MaterializeBtn className="btn-large table-item-add-btn" onClick={add} />
			</MaterializePreloader>
		</div>
	)
}
