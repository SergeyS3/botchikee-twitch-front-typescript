import WsWatcher from './wsWatcher'
import Tools from '../Tools'

export default class ItemListActions {
	watcher = {}
	wasChangeCalled = false
	
	constructor(entityApiName, entityDisplayName, setItems, setIsReady) {
		this.entityApiName = entityApiName
		this.entityDisplayName = entityDisplayName
		
		this.setItems = setItems
		this.setIsReady = setIsReady
	}
	
	async init() {
		await this.set()
		
		this.watcher = new WsWatcher(this.entityApiName)
			.on('change', () => {
				if(this.wasChangeCalled)
					this.wasChangeCalled = false
				else
					this.set()
			})
	}
	
	destroy() {
		this.watcher.destroy()
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
	
	fetch(path = '', method = 'GET', data = null) {
		if(method !== 'GET')
			this.wasChangeCalled = true
		
		return Tools.fetch(`/api/rest/${this.entityApiName}${path}`, method, data)
	}
	
	toast(text, error = false) {
		M.toast({
			html: `${this.entityDisplayName} ${text}`,
			classes: error ? 'red darken-1' : 'green darken-1'
		})
	}
}
