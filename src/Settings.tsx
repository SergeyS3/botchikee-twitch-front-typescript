import { ISettingsItem } from './types'
import React, { FC } from 'react'
import useItemListActions from './hooks/useItemListActions'
import useTitle from './hooks/useTitle'
import { Link } from 'react-router-dom'
import MaterializePreloader from './react-components/materialize/Preloader'
import SettingsItem from './SettingsItem'

const Settings: FC = () => {
	const [settings, isReady, actions] = useItemListActions<ISettingsItem>('settings', 'Setting')
	
	useTitle('Settings')
	
	return (
		<>
			 
			<div className="table-items-list table-items-list-vertical col s6">
				<h4>Settings</h4>
				<MaterializePreloader ready={isReady}>
					{settings.length ? (
						<SettingsItem
							save={actions.save}
							item={settings[0]}
						/>
					) : ''}
				</MaterializePreloader>
				<h5>More settings</h5>
				<Link to="/modules">Modules <i className="material-icons tiny arrow">arrow_forward</i></Link>
			</div>
		</>
	)
}

export default Settings
