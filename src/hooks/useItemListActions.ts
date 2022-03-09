import { AnyItem, ItemSaveAction } from '../types'
import { useState, useEffect, useRef, useMemo } from 'react'
import WsWatcher from '../tools/wsWatcher'
import ItemListActions from '../tools/ItemListActions'

interface IActions<T> {
	add(item: Omit<T, 'key'>): void
	save: ItemSaveAction<T>
	remove(item: T): Promise<void>
}

export default <T extends AnyItem>(entityApiName: string, entityDisplayName: string, hasWsWatcher = true): [T[], boolean, IActions<T>] => {
	const [items, setItems] = useState<T[]>([])
	const [isReady, setIsReady] = useState(false)
	let wasChangeCalled = useRef(false)
	
	const itemListActions = useMemo(() => {
		const itemListActions = new ItemListActions<T>(entityApiName, entityDisplayName)
		if(hasWsWatcher)
			itemListActions
				.on('beforeAction',  action => {
					if(action !== 'getList')
						wasChangeCalled.current = true
				})
		
		return itemListActions
	}, [])
	
	const set = () => itemListActions.getList().then(setItems)
	
	const actions: IActions<T> = useMemo(() => ({
		add: item => 
			setItems(items => {
				items.push({ ...item, key: +new Date } as T)
				return [ ...items ]
			}),
		save: item => item.id ? itemListActions.update(item) : itemListActions.add(item),
		remove: async item => {
			if(item.id)
				await itemListActions.delete(item.id)
			setItems(items => items.filter(i => i.key !== item.key))
		}
	}), [])
	
	useEffect(() => {
		set().then(() => setIsReady(true))
		
		if(hasWsWatcher) {
			let wsWatcher = new WsWatcher(entityApiName).on('change', () => {
				if(wasChangeCalled.current)
					wasChangeCalled.current = false
				else
					set()
			})
			return () => wsWatcher.destroy()
		}
	}, [])
	
	return [items, isReady, actions]
}
