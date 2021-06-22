import React from 'react'

export default props => (
	<div className="switch">
		<label>
			<input type="checkbox" {...props} />
			<span className="lever" />
		</label>
	</div>
)
