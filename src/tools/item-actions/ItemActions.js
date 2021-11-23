import Actions from './Actions';

export default class ItemActions extends Actions{
	constructor(entityApiName, entityDisplayName, setItem, setFocusedCol, requiredFields = []) {
		super(entityApiName, entityDisplayName)
		this.setItem = setItem
		this.setFocusedCol = setFocusedCol
		this.requiredFields = requiredFields
	}
	
	setVal(key, newVal) {
		this.setItem(item => {
			if(item[key].toString() === newVal.toString())
				return item
			
			item[key] = newVal
			
			if(this.requiredFields.every(field => item[field]))
				this.save(item)
			
			return { ...item }
		})
		
		this.setFocusedCol('')
	}
	
	async save(item) {
		if(item.id) {
			const res = await this.fetch(`/${item.id}`, 'PUT', item)
			
			if(res.status !== 200) {
				this.toast('not saved', true)
				return
			}
			
			this.toast('saved')
		}
		else {
			const res = await this.fetch('', 'POST', item)
			
			if(res.status !== 201) {
				this.toast('not added', true)
				return
			}
			
			item.id = (await res.json()).id
			
			this.setItem({ ...item })
			
			this.toast('added')
		}
	}
}
