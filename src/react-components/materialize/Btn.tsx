import React, { useRef, useEffect, FC, MouseEventHandler } from 'react'

interface IProps {
	className: string
	onClick: MouseEventHandler
}

const Btn: FC<IProps> = props => {
	const addBtnRef = useRef<HTMLAnchorElement>()
	
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

export default Btn
