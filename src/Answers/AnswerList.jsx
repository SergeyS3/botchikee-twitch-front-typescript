import React, { useState, useEffect } from 'react'
import Tools from '../tools/Tools'
import AnswerItem from './AnswerItem'
import MaterializePreloader from '../react_components/materialize/Preloader'
import MaterializeBtn from '../react_components/materialize/Btn'

import '../styles.css'

const apiUrl = '/api/answers'

export default () => {
	let [answers, setAnswers] = useState([])
	let [isReady, setIsReady] = useState(false)
	
	const addAnswer = () => {
		answers.push({
			tmpId: +new Date(),
			active: false,
			type: 'command',
			text: '',
			answer: '',
			channels: [],
			users: []
		})
		setAnswers([...answers])
	}
	const changeAnswer = async answer => {
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
					answer.id = (await res.json()).id
					
					setAnswers(prevAnswers => {
						const answerIndex = prevAnswers.findIndex(a => a.tmpId == answer.tmpId)
						prevAnswers[answerIndex] = answer
						
						return [...prevAnswers]
					})
					
					M.toast({html: 'answer added'})
				}
			}
	}
	const removeAnswer = async answer => {
		const setAnswer = () => {
			answers = answers.filter(a => a != answer)
			setAnswers(answers)
		}
		
		if(answer.id) {
			const res = await Tools.fetch(`${apiUrl}/${answer.id}`, 'DELETE')

			if(res.status != 200)
				M.toast({html: 'answer not deleted'})
			else {
				setAnswer()
				M.toast({html: 'answer deleted'})
			}
		}
		else
			setAnswer()
	}
	
	const knownUsers = ['airchikee']
	
	useEffect(() => {
		(async () => {
			const res = await fetch(apiUrl)
			answers = await res.json()
			
			setAnswers(answers)
			setIsReady(true)
		})()
	}, [])
	
	return (
		<div className="table-items-list">
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
							return <AnswerItem
								answer={answer}
								key={answer.id || answer.tmpId}
								onChange={changeAnswer}
								onRemove={removeAnswer}
								knownUsers={knownUsers}
							/>
						})}
					</tbody>
				</table>
				<MaterializeBtn className="add-answer-btn" onClick={addAnswer} />
			</MaterializePreloader>
		</div>
	)
}
