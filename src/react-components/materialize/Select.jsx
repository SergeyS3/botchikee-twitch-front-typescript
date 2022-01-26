import React, { useRef, useEffect } from 'react'

export default props => {
	const selectRef = useRef()
	
	useEffect(() => {
		const selectInstance = M.FormSelect.init(selectRef.current, {}),
			options = [...selectInstance.dropdownOptions.querySelectorAll('li:not(.optgroup)')]
		
		if(props.onBlur || props.onFocus) {
			const onBlur = () => {
				window.removeEventListener('click', onBlur)
				options.forEach(option => option.removeEventListener('click', onBlur))
				
				props.onBlur && props.onBlur(selectInstance.input.value)
			}
			selectInstance.input.addEventListener('click', () => {
				setTimeout(() => {
					window.addEventListener('click', onBlur)
					options.forEach(option => option.addEventListener('click', onBlur))
				}, 1)
				
				props.onFocus && props.onFocus(selectInstance.input.value)
			})
		}
	}, [])
	
	return (
		<select defaultValue={props.defaultValue} ref={selectRef} >
			{props.options.map((option, i) => {
				return <option key={i + option.value + option.text} value={option.value}>{option.text}</option>
			})}
		</select>
	)
}
