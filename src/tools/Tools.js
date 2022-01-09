
export default class Tools {
	static async fetch(url, method = 'GET', data = null) {
		try {
			return await fetch(url, {
				method,
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: data ? JSON.stringify(data) : null
			})
		}
		catch (e) {
			console.error(e)
		}
	}
	
	static moveArrayValsToProps(arr) {
		return arr.reduce((acc, user) => (acc[user] = null, acc), {})
	}
}
