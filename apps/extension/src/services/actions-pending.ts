import { Runtime } from 'webextension-polyfill'
import { Mutex } from 'async-mutex'

const mutex = new Mutex()

const actionsToConfirm: {
	[key: string]: Runtime.Port
} = {}

export const addPendingAction = async (id: string, port: Runtime.Port) => {
	const release = await mutex.acquire()

	actionsToConfirm[id] = port

	release()
}

export const deletePendingAction = async (id: string) => {
	const release = await mutex.acquire()

	delete actionsToConfirm[id]

	release()
}

export const getPendingAction = async (id: string): Promise<Runtime.Port> => {
	const release = await mutex.acquire()

	const port = actionsToConfirm[id]

	release()
	return port
}
