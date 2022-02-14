import ItemListService from './ItemListService'
import { EventEmitter } from 'events'

export default class ItemListActions extends EventEmitter {
	constructor(entityApiName, entityDisplayName) {
		super()
		
		this.entityDisplayName = entityDisplayName
		this.itemListService = new ItemListService(entityApiName)
		
		;[
			['getList', 'fetch error'],
			['add', 'not added', 'added'],
			['update', 'not saved', 'saved'],
			['delete', 'not deleted', 'deleted'],
		].map(([action, failToast, successToast]) =>
			this[action] = this.makeAction(action, failToast, successToast)	
		)
	}
	
	makeAction(action, failToast, successToast) {
		return async (...args) => {
			let res
			
			this.emit('beforeAction', action)
			
			try {
				res = this.itemListService[action](...args)
				successToast && this.toast(successToast)
			}
			catch (e) {
				console.error(e.message)
				failToast && this.toast(failToast, true)
			}
			
			return res
		}
	}
	
	toast(text, error = false) {
		M.toast({
			html: `${this.entityDisplayName} ${text}`,
			classes: error ? 'red darken-1' : 'green darken-1'
		})
	}
}
