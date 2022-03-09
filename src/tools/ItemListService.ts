import { AnyItem } from '../types'
import { _fetch } from '.'

export default class <T extends AnyItem> {
	constructor(private entityApiName: string) {}
	
	async getList() {
		const res = await this.fetch()
		
		if(res.status !== 200)
			throw Error('fetch error')
		
		let items: T[] = await res.json()
		for(const item of items)
			item.key = item.id
		
		return items
	}
	
	async add(item: T) {
		const res = await this.fetch('', 'POST', item)
		
		if(res.status !== 201)
			throw Error('fetch error')
		
		return (await res.json()).id as string
	}
	
	async update(item: T) {
		const res = await this.fetch(`/${item.id}`, 'PUT', item)
		
		if(res.status !== 200)
			throw Error('fetch error')
	}
	
	async delete(itemId: string) {
		const res = await this.fetch(`/${itemId}`, 'DELETE')
		
		if(res.status !== 200)
			throw Error('fetch error')
	}
	
	private fetch(path: RequestInfo = '', method = 'GET', data: T = null) {
		return _fetch(`/api/rest/${this.entityApiName}${path}`, method, data)
	}
}
