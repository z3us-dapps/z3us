import { Mutex } from 'async-mutex'
import { getNoneSharedStore } from 'packages/ui/src/services/state'
import { sharedStore } from 'packages/ui/src/store'
import type { Keystore } from 'packages/ui/src/store/types'

import { CryptoService } from '@src/crypto/crypto'
import type { Data } from '@src/types/vault'

import { getSelectedKeystore } from './keystore'
import { getSecret, removeSecret, saveSecret } from './storage'

export class Vault {
	private mutex: Mutex

	private crypto: CryptoService

	private keystore: Keystore | null

	private data: Data | null

	private timer: NodeJS.Timeout | null

	constructor(crypto: Crypto) {
		this.crypto = new CryptoService(crypto)
		this.mutex = new Mutex()
		this.keystore = null
		this.data = null
		this.timer = null
	}

	get = async (password: string): Promise<Data | null> => {
		const keystore = getSelectedKeystore()
		if (!keystore) {
			throw new Error('Keystore is not selected')
		}

		if (this.data && this.keystore.id === keystore.id) {
			return this.data
		}
		if (!password) {
			throw new Error('Missing password')
		}

		const secret = await getSecret(keystore)
		try {
			const data = await this.crypto.decrypt<Data>(password, secret)

			const release = await this.mutex.acquire()
			this.data = data
			this.keystore = keystore
			release()
		} catch (error) {
			const release = await this.mutex.acquire()
			this.lock()
			release()
			throw error
		}

		return this.data
	}

	save = async (data: Data, password: string): Promise<Data | null> => {
		if (!password) {
			throw new Error('Missing password')
		}
		const keystore = getSelectedKeystore()
		if (!keystore) {
			throw new Error('Keystore is not selected')
		}
		const secret = await this.crypto.encrypt<Data>(password, data)
		await saveSecret(keystore, secret)

		return this.get(password)
	}

	remove = async (password: string) => {
		if (!password) {
			throw new Error('Missing password')
		}
		const keystore = getSelectedKeystore()
		if (!keystore) {
			throw new Error('Keystore is not selected')
		}

		try {
			// check if we can decrypt
			const secret = await getSecret(keystore)
			await this.crypto.decrypt<Data>(password, secret)
			if (this.keystore) {
				await removeSecret(keystore)
			} else {
				throw new Error('Unauthorised secret deletion!')
			}
		} finally {
			const release = await this.mutex.acquire()
			this.lock()
			release()
		}
	}

	restartTimer = async () => {
		const { selectKeystoreId } = sharedStore.getState()
		const noneSharedStore = await getNoneSharedStore(selectKeystoreId)
		const { walletUnlockTimeoutInMinutes = 5 } = noneSharedStore.getState()

		const release = await this.mutex.acquire()
		if (this.timer) {
			clearTimeout(this.timer)
		}
		this.timer = setTimeout(this.lock, walletUnlockTimeoutInMinutes * 60 * 1000)
		release()
	}

	clearTimer = async () => {
		const release = await this.mutex.acquire()
		if (this.timer) {
			clearTimeout(this.timer)
		}
		this.timer = null
		release()
	}

	private lock = async () => {
		if (this.timer) {
			clearTimeout(this.timer)
		}
		this.timer = null
		this.data = null
		this.keystore = null
	}
}
