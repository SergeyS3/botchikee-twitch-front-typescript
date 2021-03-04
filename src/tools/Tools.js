
class Tools{
	static async fetch(url, method, data = {}) {
		try {
			return await fetch(url, {
				method,
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: data ? JSON.stringify(data) : ''
			})
		}
		catch (e) {
			console.error(e)
		}
		 
	}
}

module.exports = Tools