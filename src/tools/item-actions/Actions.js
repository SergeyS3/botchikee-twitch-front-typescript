import Tools from '../Tools'

export default class Actions{
	constructor(entityApiName, entityDisplayName) {
		this.entityApiName = entityApiName
		this.entityDisplayName = entityDisplayName
	}
	
	fetch(path = '', method = 'GET', data = null) {
		return Tools.fetch(`/api/rest/${this.entityApiName}${path}`, method, data)
	}
	
	toast(text, error = false) {
		M.toast({
			html: `${this.entityDisplayName} ${text}`,
			classes: error ? 'red darken-1' : 'green darken-1'
		})
	}
}
