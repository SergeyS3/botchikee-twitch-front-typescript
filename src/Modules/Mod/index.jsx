import React from 'react'
import useTitle from '../../hooks/useTitle'
import BackBtn from '../../react-components/BackBtn'
import PredefinedReplacements from './PredefinedReplacements'
import ReplacementList from './ReplacementList'
import BanWordList from './BanWordList'

export default () => {
	useTitle('Mod module settings')
	
	return (
		<>
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
}
