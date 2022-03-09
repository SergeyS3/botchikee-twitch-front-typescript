import { AnyItem, ItemSaveAction, SetItemVal } from '../types'
import useItemState from './useItemState'

export default <T extends AnyItem>(
	save: ItemSaveAction<T>,
	initialItem: T,
	requiredFields: Array<keyof T> = []
): [T, SetItemVal<T>]  => {
	const [item, setItem] = useItemState<T>(initialItem)
	
	const setVal: SetItemVal<T> = <K extends keyof T>(key: K, newVal: T[K]) => {
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
