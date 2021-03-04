import React from 'react'
import {Hover, HoverActive, HoverInactive} from '../react_components/Hover'
import MaterializeSwitch from '../react_components/MaterializeSwitch'
import MaterializeSelect from '../react_components/MaterializeSelect'
import MaterializeChips from '../react_components/MaterializeChips'

const List = ({list, active}) => 
	list.length
		? list.join(', ')
		: <div className={`grey-text text-${active ? 'darken' : 'lighten'}-1`}>*all*</div>

export default function AnswerItem(props) {
	let {id, active, type, text, answer, channels, users} = props.answer
	
	const [focusedCol, setFocusedCol] = React.useState(''),
		setVal = (key, newVal) => {
			const curVal = props.answer[key]
			
			if((newVal || key == 'active') && curVal.toString() != newVal.toString())
				props.onChange({...props.answer, [key]: newVal})
			setFocusedCol('')
		},
		chipsAutocompleteOptions = {
			data: props.knownUsers.reduce((acc, user) => (acc[user] = null, acc), {}),
			limit: Infinity,
			minLength: 1
		}
	
	return (
		<tr className={active ? '' : 'grey-text text-lighten-1'}>
			<td className="answer-item-switch">
				<MaterializeSwitch disabled={!id} defaultChecked={active} onChange={e => setVal('active', e.target.checked)} />
			</td>
			<td className="answer-item-type">
				<Hover hasFocus={focusedCol == 'type'}>
					<HoverInactive>
						{type}
					</HoverInactive>
					<HoverActive>
						<MaterializeSelect
							defaultValue={type}
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
			<td className={`answer-item-text ${text ? '' : 'red-text text-accent-2'}`}>
				<Hover hasFocus={focusedCol == 'text'}>
					<HoverInactive>
						{text || '*enter text*'}
					</HoverInactive>
					<HoverActive>
						<span className="z-depth-3">
							<input
								type="text"
								defaultValue={text}
								onFocus={() => setFocusedCol('text')}
								onBlur={e => setVal('text', e.target.value)}
							/>
						</span>
					</HoverActive>
				</Hover>
			</td>
			<td className={`answer-item-answer ${answer ? '' : 'red-text text-accent-2'}`}>
				<Hover hasFocus={focusedCol == 'answer'}>
					<HoverInactive>
						{answer || '*enter answer*'}
					</HoverInactive>
					<HoverActive>
						<span className="z-depth-3">
							<input
								type="text"
								defaultValue={answer}
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
						<List list={channels} active={active} />
					</HoverInactive>
					<HoverActive>
						<span className="z-depth-3">
							<MaterializeChips
								items={channels}
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
						<List list={users} active={active} />
					</HoverInactive>
					<HoverActive>
						<span className="z-depth-3">
							<MaterializeChips
								items={users}
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
