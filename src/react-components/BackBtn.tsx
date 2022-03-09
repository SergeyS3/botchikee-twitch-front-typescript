import React, { FC } from 'react'
import { Link } from 'react-router-dom'

interface IProps {
	href: string
}

const BackBtn: FC<IProps> = props =>
	<Link to={props.href}>
		<i className="material-icons tiny arrow">arrow_back</i> {props.children}
	</Link>

export default BackBtn
