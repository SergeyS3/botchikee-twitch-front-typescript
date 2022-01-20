import React, { useState, useEffect, useMemo } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import MaterializePreloader from './react-components/materialize/Preloader'
import ItemListActions from './tools/item-actions/ItemListActions'
import SettingsItem from './SettingsItem'

export default () => {
	let [settings, setSettings] = useState([])
	let [isReady, setIsReady] = useState(false)
	
	const itemListActions = useMemo(() => new ItemListActions('settings', 'Setting', setSettings, setIsReady), [])
	
	useEffect(() => {
		itemListActions.init()
		
		return () => itemListActions.destroy()
	}, [])
	
	return (
		<>
			<Helmet>
				<title>Botchikee - Settings</title>
			</Helmet>
			 
			<div className="table-items-list table-items-list-vertical col s6">
				<h4>Settings</h4>
				<MaterializePreloader ready={isReady}>
					<SettingsItem
						itemListActions={itemListActions}
						settings={settings[0]}
					/>
				</MaterializePreloader>
				<h5>More settings</h5>
				<Link to="/modules">Modules <i className="material-icons tiny arrow">arrow_forward</i></Link>
			</div>
		</>
	)
}
