import React  from 'react'
import useTitle from './hooks/useTitle'

export default ({ user }) => {
	useTitle('No access')
	
	return (
		<h4 className="red-text text-accent-2">{user.name ? 'No access' : 'Not logged in'}</h4>
	)
}
