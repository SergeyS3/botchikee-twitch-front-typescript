import React from 'react'

export default class MaterializeChips extends React.Component {
	constructor(props) {
		super(props)
		
		this.chipsRef = React.createRef()
	}
	render() {
		return <div className="chips chips-initial" ref={this.chipsRef} />
	}
	componentDidMount() {
		let chips
		const params = {
				data: this.props.items.map(i => ( {tag: i} )),
				autocompleteOptions: this.props.autocompleteOptions || {}
			},
			initChips = () => chips = M.Chips.init(this.chipsRef.current, params)
		
		if(this.props.onBlur || this.props.onFocus) {
			const getValues = () => chips.chipsData.map(c => c.tag)
			const onFocusStart = () => {
				chips.$input[0].removeEventListener('focus', onFocusStart)
				document.addEventListener('mouseup', onFocusEnd)
			}
			const onFocusEnd = () => {
				document.removeEventListener('mouseup', onFocusEnd)
				setTimeout(() => document.addEventListener('click', onBlur), 1)
				
				this.props.onFocus && this.props.onFocus(getValues())
			}
			const onBlur = e => {
				if(e.path.includes(this.chipsRef.current))
					return
				
				document.removeEventListener('click', onBlur)
				chips.$input[0].addEventListener('focus', onFocusStart)
				
				this.props.onBlur && this.props.onBlur(getValues())
			}
			params.onChipDelete = onFocusEnd
			
			initChips()
			chips.$input[0].addEventListener('focus', onFocusStart)
		}
		else
			initChips()
	}
}
