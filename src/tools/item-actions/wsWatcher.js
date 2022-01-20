import { EventEmitter } from 'events'

export default class WsWatcher extends EventEmitter {
	constructor(entityApiName) {
		super()
		
		this.url = `${location.origin.replace(/^http/, 'ws')}/api/ws/${entityApiName}`
		
		this.init()
	}
	
	init() {
		this.ws = new WebSocket(this.url)
		
		this.ws.onmessage = e => {
			if(e.data === 'changed')
				this.emit('change')
		}
		this.ws.onclose = e => {
			if(e.code !== 1000)
				setTimeout(() => this.init(), 5000)
		}
	}
	
	destroy() {
		this.ws.close(1000)
	}
}
