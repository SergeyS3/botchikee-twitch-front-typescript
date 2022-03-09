import React, { FC, PropsWithChildren } from 'react'
import './Hover.css'

interface IProps {
	hasFocus: boolean
}

type PropsWithClassName = PropsWithChildren<{className?: string}>

export const Hover: FC<IProps> = props => (
		<div className={`hover-component--container ${props.hasFocus ? 'has-focus' : ''}`}>
			{props.children instanceof Array && props.children.map((child, index) => {
				let hoverClassName: string
				
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
	HoverActive: FC<PropsWithClassName> = ({ children }) => <>{children}</>,
	HoverInactive: FC<PropsWithClassName> = ({ children }) => <>{children}</>
