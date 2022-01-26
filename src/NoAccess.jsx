import React, { useEffect } from 'react'

export default ({ user }) => {
	useEffect(() => {
		document.title = 'No access'
	}, [])
	
	return (
		<h4 className="red-text text-accent-2">{user.name ? 'No access' : 'Not logged in'}</h4>
	)
}
