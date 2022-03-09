import { IUser } from './types'
import React, { FC } from 'react'
import useTitle from './hooks/useTitle'

const NoAccess: FC<IUser> = (user: IUser) => {
	useTitle('No access')
	
	return (
		<h4 className="red-text text-accent-2">{user.name ? 'No access' : 'Not logged in'}</h4>
	)
}

export default NoAccess
