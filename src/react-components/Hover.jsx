import React from 'react'
import './Hover.css'

export const Hover = props => (
		<div className={`hover-component--container ${props.hasFocus ? 'has-focus' : ''}`}>
			{props.children.map((child, index) => {
				let hoverClassName
				
				switch(child.type.name) {
					case HoverInactive.name:
						hoverClassName = 'hover-component--no-hover'
						break
					case HoverActive.name:
						hoverClassName = 'hover-component--has-hover'
				}
				
				if(!hoverClassName)
					return child
				
				if(child.props.className)
					hoverClassName += ` ${child.props.className}`
				
				return <div className={hoverClassName} key={index}>{child}</div>
			})}
		</div>
	),
	HoverActive = ({children}) => children,
	HoverInactive = ({children}) => children
