import React from 'react'
import { Link } from "react-router-dom";

export default props =>
	<Link to={props.href}>
		{props.children
			? <>
				<i className="material-icons tiny">arrow_back</i> {props.children}
			</>
			: ' '
		}
	</Link>


