import React from 'react'
import './Hover.css'

export const Hover = props => {
		const getChild = name => props.children.filter(c => c.type.name == name)
		
		return (
			<div className={`hover-component--container ${props.hasFocus ? 'has-focus' : ''}`}>
				<span className="hover-component--no-hover">
					{getChild(HoverInactive.name)}
				</span>
				<span className="hover-component--has-hover">
					{getChild(HoverActive.name)}
				</span>
			</div>
		)
	},
	HoverActive = ({children}) => children,
	HoverInactive = ({children}) => children
