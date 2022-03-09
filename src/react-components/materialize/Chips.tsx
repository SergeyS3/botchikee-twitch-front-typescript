import React, { useRef, useEffect, FC } from 'react'

interface IProps {
	items: string[]
	autocompleteOptions: Partial<M.AutocompleteOptions>
	onFocus: Function
	onBlur: Function
}

const Chips: FC<IProps> = props => {
	let chipsRef = useRef()
	
	useEffect(() => {
		let chips: M.Chips & {
			$input?: MElements
		}
		const params: Partial<M.ChipsOptions> = {
			data: props.items.map(i => ( {tag: i} )),
			autocompleteOptions: props.autocompleteOptions || {}
		}
		const initChips = () => chips = M.Chips.init(chipsRef.current, params)
		
		if(props.onBlur || props.onFocus) {
			const onFocusStart = () => {
				chips.$input[0].removeEventListener('focus', onFocusStart)
				document.addEventListener('mouseup', onFocusEnd)
			}
			const onFocusEnd = () => {
				document.removeEventListener('mouseup', onFocusEnd)
				setTimeout(() => document.addEventListener('click', onBlur), 1)
				
				props.onFocus && props.onFocus()
			}
			const onBlur = (e: Event) => {
				if(e.composedPath().includes(chipsRef.current))
					return
				
				document.removeEventListener('click', onBlur)
				chips.$input[0].addEventListener('focus', onFocusStart)
				
				props.onBlur && props.onBlur(chips.chipsData.map(c => c.tag))
			}
			params.onChipDelete = onFocusEnd
			
			initChips()
			chips.$input[0].addEventListener('focus', onFocusStart)
			
			return () => chips.$input[0].removeEventListener('focus', onFocusStart)
		}
		else
			initChips()
	}, [props.items.toString()])
	
	return <div className="chips chips-initial" ref={chipsRef} />
}

export default Chips
