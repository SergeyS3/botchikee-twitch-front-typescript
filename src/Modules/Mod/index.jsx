import React from 'react'
import BackBtn from '../../react-components/BackBtn'
import { Helmet } from 'react-helmet'
import PredefinedReplacements from './PredefinedReplacements'
import ReplacementList from './ReplacementList'
import BanWordList from './BanWordList'

export default () => (
	<>
		<Helmet>
			<title>Botchikee - Mod module settings</title>
		</Helmet>
		<div className="col s5">
			<BackBtn href="/modules">Modules</BackBtn>
			<PredefinedReplacements />
			<ReplacementList />
		</div>
		<div className="table-items-list col s7">
			 
			<BanWordList />
		</div>
	</>
)
