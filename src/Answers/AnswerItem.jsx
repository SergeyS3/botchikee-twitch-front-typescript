import React, { useState } from 'react'
import { Hover, HoverActive, HoverInactive } from '../react_components/Hover'
import MaterializeSwitch from '../react_components/MaterializeSwitch'
import MaterializeSelect from '../react_components/MaterializeSelect'
import MaterializeChips from '../react_components/MaterializeChips'

const List = ({ list, active }) => 
	list.length
		? list.join(', ')
		: <div className={`grey-text text-${active ? 'darken' : 'lighten'}-1`}>*all*</div>

export default props => {
	const [answer, setAnswer] = useState(props.answer)
	const [focusedCol, setFocusedCol] = useState('')
	
	const setVal = (key, newVal) => {
		setAnswer(answer => {
			const curVal = answer[key]
			answer[key] = newVal
			
			if((newVal || key == 'active') && curVal.toString() != newVal.toString())
				props.onChange(answer)
			
			return answer
		})
		setFocusedCol('')
	}
	
	const chipsAutocompleteOptions = {
		data: props.knownUsers.reduce((acc, user) => (acc[user] = null, acc), {}),
		limit: Infinity,
		minLength: 1
	}
	
	return (
		<tr className={answer.active ? '' : 'grey-text text-lighten-1'}>
			<td className="answer-item-switch">
				<MaterializeSwitch disabled={!answer.id} defaultChecked={answer.active} onChange={e => setVal('active', e.target.checked)} />
			</td>
			<td className="answer-item-type">
				<Hover hasFocus={focusedCol == 'type'}>
					<HoverInactive>
						{answer.type}
					</HoverInactive>
					<HoverActive>
						<MaterializeSelect
							defaultValue={answer.type}
							options={[
								{value: 'command', text: 'command'},
								{value: 'message', text: 'message'},
								{value: 'substring', text: 'substring'},
							]}
							onFocus={() => setFocusedCol('type')}
							onBlur={value => setVal('type', value)}
						/>
					</HoverActive>
				</Hover>
			</td>
			<td className={`answer-item-text ${answer.text ? '' : 'red-text text-accent-2'}`}>
				<Hover hasFocus={focusedCol == 'text'}>
					<HoverInactive>
						{answer.text || '*enter text*'}
					</HoverInactive>
					<HoverActive>
						<span className="z-depth-3">
							<input
								type="text"
								defaultValue={answer.text}
								onFocus={() => setFocusedCol('text')}
								onBlur={e => setVal('text', e.target.value)}
							/>
						</span>
					</HoverActive>
				</Hover>
			</td>
			<td className={`answer-item-answer ${answer.answer ? '' : 'red-text text-accent-2'}`}>
				<Hover hasFocus={focusedCol == 'answer'}>
					<HoverInactive>
						{answer.answer || '*enter answer*'}
					</HoverInactive>
					<HoverActive>
						<span className="z-depth-3">
							<input
								type="text"
								defaultValue={answer.answer}
								onFocus={() => setFocusedCol('answer')}
								onBlur={e => setVal('answer', e.target.value)}
							/>
						</span>
					</HoverActive>
				</Hover>
			</td>
			<td className="answer-item-channels">
				<Hover hasFocus={focusedCol == 'channels'}>
					<HoverInactive>
						<List list={answer.channels} active={answer.active} />
					</HoverInactive>
					<HoverActive>
						<span className="z-depth-3">
							<MaterializeChips
								items={answer.channels}
								onFocus={() => setFocusedCol('channels')}
								onBlur={channels => setVal('channels', channels)}
								autocompleteOptions={chipsAutocompleteOptions}
							/>
						</span>
					</HoverActive>
				</Hover>
			</td>
			<td className="answer-item-users">
				<Hover hasFocus={focusedCol == 'users'}>
					<HoverInactive>
						<List list={answer.users} active={answer.active} />
					</HoverInactive>
					<HoverActive>
						<span className="z-depth-3">
							<MaterializeChips
								items={answer.users}
								onFocus={() => setFocusedCol('users')}
								onBlur={users => setVal('users', users)}
								autocompleteOptions={chipsAutocompleteOptions}
							/>
						</span>
					</HoverActive>
				</Hover>
			</td>
			<td className="answer-item-delete">
				<i className="material-icons red-text" onClick={() => props.onRemove(props.answer)}>delete</i>
			</td>
		</tr>
	)
}
