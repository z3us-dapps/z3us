import { Mutex } from 'async-mutex'

import { defaultNoneStoreKey } from '@src/config'
import { NoneSharedStore, createNoneSharedStore } from '@src/store'

const mutex = new Mutex()

export const defaultNoneSharedStore = createNoneSharedStore(defaultNoneStoreKey)

const noneSharedStoreContainer: { [key: string]: NoneSharedStore } = {
	[defaultNoneStoreKey]: defaultNoneSharedStore,
}

export const getNoneSharedStore = async (suffix: string): Promise<NoneSharedStore> => {
	const name = !suffix ? defaultNoneStoreKey : `${defaultNoneStoreKey}-${suffix}`

	let store = noneSharedStoreContainer[name]
	if (store) {
		return store
	}

	const release = await mutex.acquire()

	// recheck after lock
	store = noneSharedStoreContainer[name]
	if (store) {
		release()
		return store
	}

	const newStore = createNoneSharedStore(name)
	noneSharedStoreContainer[name] = newStore

	release()
	return newStore
}
