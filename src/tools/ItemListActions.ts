import { AnyItem, id } from '../types'
import ItemListService from './ItemListService'
import { EventEmitter } from 'events'

type GetListActionResult<T> = Promise<T[]>
type AddActionResult = Promise<id>
type UpdateActionResult = Promise<void>
type DeleteActionResult = Promise<void>
type AnyActionResult<T> = GetListActionResult<T> | AddActionResult | UpdateActionResult | DeleteActionResult

type GetListAction<T> = () => GetListActionResult<T>
type AddAction = () => AddActionResult
type UpdateAction = () => UpdateActionResult
type DeleteAction = () => DeleteActionResult
type AnyAction<T> = GetListAction<T> | AddAction | UpdateAction | DeleteAction

export default class <T extends AnyItem> extends EventEmitter {
	itemListService: ItemListService<T>
	
	constructor(entityApiName: string, private entityDisplayName: string) {
		super()
		
		this.itemListService = new ItemListService<T>(entityApiName)
	}
	
	getList() {
		return this.runAction<GetListActionResult<T>>(() => this.itemListService.getList(), 'getList', 'fetch error')
	}
	
	add(item: T) {
		return this.runAction<AddActionResult>(() => this.itemListService.add(item), 'add', 'not added', 'added')
	}
	
	update(item: T) {
		return this.runAction<UpdateActionResult>(() => this.itemListService.update(item), 'update', 'not saved', 'saved')
	}
	
	delete(itemId: string) {
		return this.runAction<DeleteActionResult>(() => this.itemListService.delete(itemId), 'delete', 'not deleted', 'deleted')
	}
	
	runAction<R extends AnyActionResult<T>>(action: AnyAction<T>, actionName: string, failToast: string, successToast?: string) {
		let res: AnyActionResult<T>
		
		this.emit('beforeAction', actionName)
		
		try {
			res = action()
			successToast && this.toast(successToast)
		}
		catch (e) {
			console.error(e.message)
			failToast && this.toast(failToast, true)
		}
		
		return res as R
	}
	
	toast(text: string, error = false) {
		M.toast({
			html: `${this.entityDisplayName} ${text}`,
			classes: error ? 'red darken-1' : 'green darken-1'
		})
	}
}
