import { Mutex } from 'async-mutex'
import { defaultAccountStoreKey } from '@src/config'
import { AccountStore, createAccountStore } from '@src/store'

const mutex = new Mutex()

export const defaultAccountStore = createAccountStore(defaultAccountStoreKey)

const accountStoreContainer: { [key: string]: AccountStore } = {
	[defaultAccountStoreKey]: defaultAccountStore,
}

export const getAccountStore = async (suffix: string): Promise<AccountStore> => {
	const name = !suffix ? defaultAccountStoreKey : `${defaultAccountStoreKey}-${suffix}`

	let store = accountStoreContainer[name]
	if (store) {
		return store
	}

	const release = await mutex.acquire()

	// recheck after lock
	store = accountStoreContainer[name]
	if (store) {
		return store
	}

	const newStore = createAccountStore(name)
	accountStoreContainer[name] = newStore
	release()

	return newStore
}
