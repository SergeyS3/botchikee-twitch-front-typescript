import React from 'react'

export default props => (
	<div className="switch">
		<label>
			<input type="checkbox" disabled={props.disabled} defaultChecked={props.defaultChecked} onChange={props.onChange} />
			<span className="lever" />
		</label>
	</div>
)
