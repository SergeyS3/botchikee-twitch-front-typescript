import React, { DOMAttributes, FC } from 'react'

type IProps = DOMAttributes<HTMLInputElement>

const Switch: FC<IProps> = props => (
	<div className="switch">
		<label>
			<input type="checkbox" {...props} />
			<span className="lever" />
		</label>
	</div>
)

export default Switch
