import { AnyItem } from '../types'

export const _fetch = async (url: RequestInfo, method = 'GET', data: AnyItem | null = null) => {
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

export const moveArrayValsToProps = (arr: string[]) => {
	return arr.reduce((acc: { [key: string]: null }, val) => (acc[val] = null, acc), {})
}
