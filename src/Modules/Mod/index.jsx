import React from 'react'
import BackBtn from '../../react-components/BackBtn'
import { Helmet } from 'react-helmet'
import ReplacementList from './ReplacementList'
import BanWordList from './BanWordList'

export default () => (
	<>
		<Helmet>
			<title>Botchikee - Mod module settings</title>
		</Helmet>
		<div className="col">
			<BackBtn href="/modules">Modules</BackBtn>
			<ReplacementList />
		</div>
		<div className="table-items-list col s6">
			<BanWordList />
		</div>
	</>
)
