import {useState, useEffect, Dispatch, SetStateAction} from 'react'

export default <T>(initialItem: T): [T, Dispatch<SetStateAction<T>>] => {
	const [item, setItem] = useState<T>(initialItem)
	
	useEffect(() => setItem(initialItem), [initialItem])
	
	return [item, setItem]
}
