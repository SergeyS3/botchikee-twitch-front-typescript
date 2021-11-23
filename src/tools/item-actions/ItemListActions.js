import Actions from './Actions'

export default class ItemListActions extends Actions{
	constructor(entityApiName, entityDisplayName, setItems, setIsReady) {
		super(entityApiName, entityDisplayName)
		
		this.setItems = setItems
		this.setIsReady = setIsReady
	}
	
	async set() {
		const res = await this.fetch()
		
		if(res.status !== 200) {
			this.toast('data fetch error', true)
			return
		}
		
		let items = await res.json()
		for(const item of items)
			item.key = item.id
		
		this.setItems(items)
		this.setIsReady(true)
	}
	
	add(data) {
		this.setItems(items => {
			items.push(data)
			return [ ...items ]
		})
	}
	
	async remove(item) {
		if(item.id) {
			const res = await this.fetch(`/${item.id}`, 'DELETE')
			
			if(res.status !== 200) {
				this.toast('not deleted', true)
				return
			}
			
			this.toast('deleted')
		}
			
		this.setItems(items => items.filter(i => i.key !== item.key))
	}
}
