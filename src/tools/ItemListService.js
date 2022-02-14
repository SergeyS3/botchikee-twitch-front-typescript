import { _fetch } from '.'

export default class ItemListService {
	constructor(entityApiName) {
		this.entityApiName = entityApiName
	}
	
	async getList() {
		const res = await this.fetch()
		
		if(res.status !== 200)
			throw Error('fetch error')
		
		let items = await res.json()
		for(const item of items)
			item.key = item.id
		
		return items
	}
	
	async add(item) {
		const res = await this.fetch('', 'POST', item)
		
		if(res.status !== 201)
			throw Error('fetch error')
		
		return (await res.json()).id
	}
	
	async update(item) {
		const res = await this.fetch(`/${item.id}`, 'PUT', item)
		
		if(res.status !== 200)
			throw Error('fetch error')
	}
	
	async delete(itemId) {
		const res = await this.fetch(`/${itemId}`, 'DELETE')
		
		if(res.status !== 200)
			throw Error('fetch error')
	}
	
	fetch(path = '', method = 'GET', data = null) {
		return _fetch(`/api/rest/${this.entityApiName}${path}`, method, data)
	}
}
