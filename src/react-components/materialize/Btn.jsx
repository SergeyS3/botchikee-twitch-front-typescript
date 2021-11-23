import React, { useRef, useEffect } from 'react'

export default props => {
	const addBtnRef = useRef()
	
	useEffect(() => {
		const timer = setTimeout(() =>
			addBtnRef.current.classList.add('scale-in')
		, 1)
		
		return () => clearTimeout(timer)
	}, [])
	
	return (
		<a className={`btn-floating scale-transition scale-out ${props.className}`} onClick={props.onClick} ref={addBtnRef}>
			<i className="material-icons">add</i>
		</a>
	)
}
