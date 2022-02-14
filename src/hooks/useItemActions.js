import useItemState from './useItemState'

export default (save, initialItem, requiredFields = []) => {
	const [item, setItem] = useItemState(initialItem)
	
	const setVal = (key, newVal) => {
		setItem(item => {
			if(item[key].toString() === newVal.toString())
				return item
			
			item[key] = newVal
			
			if(requiredFields.every(field => item[field])) {
				const res = save(item)
				if(!item.id)
					res.then(id => setItem(item => ({ ...item, id})))
			}
			
			return { ...item }
		})
	}
	
	return [item, setVal]
}
