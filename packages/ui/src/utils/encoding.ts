export function JSONToHex(payload: { [key: string]: any }): string {
	return Buffer.from(JSON.stringify(payload), 'utf8').toString('hex')
}

export function hexToJSON(payload?: string): { [key: string]: any } {
	if (!payload) {
		return {}
	}
	return JSON.parse(Buffer.from(payload, 'hex').toString('utf8'))
}
