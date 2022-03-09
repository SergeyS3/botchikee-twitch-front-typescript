import React, { FC, FormEventHandler } from 'react'

interface IProps {
	onClick: FormEventHandler
}

const DeleteBtn: FC<IProps> = props => (
	<td className="table-item-delete item-delete">
		<i className="material-icons red-text" {...props}>delete</i>
	</td>
)

export default DeleteBtn
