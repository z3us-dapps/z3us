import { Mutex } from 'async-mutex'
import { Runtime } from 'webextension-polyfill'

const mutex = new Mutex()

const clientPorts: {
	[key: string]: Runtime.Port
} = {}

export const addClientPort = async (id: string, port: Runtime.Port) => {
	const release = await mutex.acquire()

	clientPorts[id] = port

	release()
}

export const deleteClientPort = async (id: string) => {
	const release = await mutex.acquire()

	delete clientPorts[id]

	release()
}

export const getClientPort = async (id: string): Promise<Runtime.Port> => {
	const release = await mutex.acquire()

	const port = clientPorts[id]

	release()
	return port
}

export const forEachClientPort = async (cb: (port: Runtime.Port) => void) => {
	const release = await mutex.acquire()

	await Promise.all(
		Object.values(clientPorts).map(async (port: Runtime.Port) => {
			try {
				cb(port)
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(error)
			}
		}),
	)

	release()
}
