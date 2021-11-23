import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
	<Link to={props.href}>
		<i className="material-icons tiny">arrow_back</i> {props.children}
	</Link>


