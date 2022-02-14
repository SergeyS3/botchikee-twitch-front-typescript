import { useState, useEffect, useRef, useMemo } from 'react'
import WsWatcher from '../tools/wsWatcher'
import ItemListActions from '../tools/ItemListActions'

export default (entityApiName, entityDisplayName, hasWsWatcher = true) => {
	const [items, setItems] = useState([])
	const [isReady, setIsReady] = useState(false)
	let wasChangeCalled = useRef(false)
	
	const itemListActions = useMemo(() => {
		const itemListActions = new ItemListActions(entityApiName, entityDisplayName)
		if(hasWsWatcher)
			itemListActions
				.on('beforeAction',  action => {
					if(action !== 'getList')
						wasChangeCalled.current = true
				})
		
		return itemListActions
	}, [])
	
	const set = () => itemListActions.getList().then(setItems)
	
	const add = data =>
		setItems(items => {
			items.push({ ...data, key: +new Date })
			return [ ...items ]
		})
	
	const save = item => item.id ? itemListActions.update(item) : itemListActions.add(item)
	
	const remove = async item => {
		if(item.id)
			await itemListActions.delete(item.id)
		setItems(items => items.filter(i => i.key !== item.key))
	}
	
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
	
	const actions = useMemo(() => ({add, save, remove}), [])
	
	return [items, isReady, actions]
}
