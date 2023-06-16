import { Mutex } from 'async-mutex'

import type { NoneSharedStore} from '@src/store';
import { createNoneSharedStore } from '@src/store'

const mutex = new Mutex()

const noneSharedStoreContainer: { [key: string]: NoneSharedStore } = {}

export const getNoneSharedStore = async (id: string): Promise<NoneSharedStore> => {
	const name = `z3us:rdt:${id}`
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
