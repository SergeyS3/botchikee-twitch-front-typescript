import React from 'react'

export default class MaterializeSelect extends React.Component {
	constructor(props) {
		super(props)
		
		this.selectRef = React.createRef()
	}
	render() {
		return (
			<select defaultValue={this.props.defaultValue} onChange={this.props.onChange} ref={this.selectRef} >
				{this.props.options.map((option, i) => {
					return <option key={i + option.value + option.text} value={option.value}>{option.text}</option>
				})}
			</select>
		)
	}
	componentDidMount() {
		const selectInstance = M.FormSelect.init(this.selectRef.current, {}),
			lis = [...selectInstance.dropdownOptions.querySelectorAll('li:not(.optgroup)')]
		
		if(this.props.onBlur || this.props.onFocus) {
			const onBlur = () => {
				window.removeEventListener('click', onBlur)
				lis.forEach(li => li.removeEventListener('click', onBlur))
				
				this.props.onBlur && this.props.onBlur(selectInstance.input.value)
			}
			selectInstance.input.addEventListener('click', () => {
				setTimeout(() => {
					window.addEventListener('click', onBlur)
					lis.forEach(li => li.addEventListener('click', onBlur))
				}, 1)
				
				this.props.onFocus && this.props.onFocus(selectInstance.input.value)
			})
		}
	}
}
