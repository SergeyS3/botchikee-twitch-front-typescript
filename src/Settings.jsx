import React from 'react'
import useItemListActions from './hooks/useItemListActions'
import useTitle from './hooks/useTitle'
import { Link } from 'react-router-dom'
import MaterializePreloader from './react-components/materialize/Preloader'
import SettingsItem from './SettingsItem'

export default () => {
	const [settings, isReady, actions] = useItemListActions('settings', 'Setting')
	
	useTitle('Settings')
	
	return (
		<>
			 
			<div className="table-items-list table-items-list-vertical col s6">
				<h4>Settings</h4>
				<MaterializePreloader ready={isReady}>
					{settings.length ? (
						<SettingsItem
							save={actions.save}
							settings={settings[0]}
						/>
					) : ''}
				</MaterializePreloader>
				<h5>More settings</h5>
				<Link to="/modules">Modules <i className="material-icons tiny arrow">arrow_forward</i></Link>
			</div>
		</>
	)
}
