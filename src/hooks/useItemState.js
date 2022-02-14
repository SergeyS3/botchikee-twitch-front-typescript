import { useState, useEffect } from 'react'

export default initialItem => {
	const [item, setItem] = useState(initialItem)
	
	useEffect(() => setItem(initialItem), [initialItem])
	
	return [item, setItem]
}
