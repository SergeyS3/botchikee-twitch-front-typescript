import React from 'react'
import Tools from "../tools/Tools";
import AnswerItem from './AnswerItem'
import MaterializePreloader from '../react_components/MaterializePreloader'

import './Answers.css'

const apiUrl = '/api/answers'

export default class AnswerList extends React.Component {
	constructor(props) {
		super(props)
		
		this.state = {answers: []}
		
		this.addBtnRef = React.createRef()
		
		this.addAnswer = this.addAnswer.bind(this)
		this.changeAnswer = this.changeAnswer.bind(this)
		this.removeAnswer = this.removeAnswer.bind(this)
	}
	addAnswer() {
		this.state.answers.push({
			tmpId: +new Date(),
			active: false,
			type: 'command',
			text: '',
			answer: '',
			channels: [],
			users: []
		})
		this.setState(this.state)
	}
	async changeAnswer(answer) {
		const setAnswers = () => {
			const answerIndex = this.state.answers.findIndex(a => a.id == answer.id)
			this.state.answers[answerIndex] = answer
			this.setState(this.state)
		}
		setAnswers()
		
		
		if(answer.text && answer.answer)
			if(answer.id) {
				const res = await Tools.fetch(`${apiUrl}/${answer.id}`, 'PUT', answer)
				
				if(res.status != 200)
					M.toast({html: 'answer not saved'})
				else
					M.toast({html: 'answer saved'})
			}
			else {
				const res = await Tools.fetch(apiUrl, 'POST', answer)
				
				if(res.status != 201)
					M.toast({html: 'answer not added'})
				else {
					Object.assign(answer, await res.json())
					setAnswers()
					M.toast({html: 'answer added'})
				}
			}
	}
	async removeAnswer(answer) {
		const setAnswers = answers => {
			this.state.answers = this.state.answers.filter(a => answer.id ? a.id != answer.id : a.tmpId != answer.tmpId)
			this.setState(this.state)
		}
		
		if(answer.id) {
			const res = await Tools.fetch(`${apiUrl}/${answer.id}`, 'DELETE')

			if(res.status != 200)
				M.toast({html: 'answer not deleted'})
			else {
				setAnswers()
				M.toast({html: 'answer deleted'})
			}
		}
		else
			setAnswers()
	}
	render() {
		return (
			<div className="answer-list">
				<h4>Answers</h4>
				{this.state.isReady ? (
					<>
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
								{this.state.answers.map(answer => {
									return <AnswerItem answer={answer} key={answer.id || answer.tmpId} onChange={this.changeAnswer} onRemove={this.removeAnswer} knownUsers={this.knownUsers} />
								})}
							</tbody>
						</table>
						<br/>
						<a className="btn-floating btn-large scale-transition scale-out add-answer-btn" onClick={this.addAnswer} ref={this.addBtnRef}>
							<i className="material-icons">add</i>
						</a>
					</>
				) : (
					<MaterializePreloader />
				)}
			</div>
		)
	}
	async componentDidMount() {
		this.knownUsers = ['airchikee']
		
		const res = await fetch(apiUrl)
		this.state.answers = await res.json()
		
		this.state.isReady = true
		
		this.setState(this.state)
		
		
		setTimeout(() =>
			this.addBtnRef.current.classList.add('scale-in')
		, 1)
	}
}
