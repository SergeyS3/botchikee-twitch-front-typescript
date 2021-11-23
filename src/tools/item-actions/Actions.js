import Tools from '../Tools'

export default class Actions{
	constructor(entityApiName, entityDisplayName) {
		this.apiUrl = `/api/${entityApiName}/`
		this.entityDisplayName = entityDisplayName
	}
	
	fetch(path = '', method = 'GET', data = null) {
		return Tools.fetch(this.apiUrl + path, method, data)
	}
	
	toast(text, error = false) {
		M.toast({
			html: `${this.entityDisplayName} ${text}`,
			classes: error ? 'red darken-1' : 'green darken-1'
		})
	}
}
