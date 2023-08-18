export const generateId = (): string =>
	crypto?.randomUUID ? crypto.randomUUID() : `${Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))}`
