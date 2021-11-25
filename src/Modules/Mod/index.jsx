import React from 'react'
import BackBtn from '../../react-components/BackBtn'
import { Helmet } from 'react-helmet'
import ReplacementList from './ReplacementList'
import BanWordList from './BanWordList'

export default () => (
	<div className="table-items-list">
		<Helmet>
			<title>Botchikee - Mod module settings</title>
		</Helmet>
		<BackBtn href="/">Modules</BackBtn>
		<ReplacementList />
		<BanWordList />
	</div>
)
