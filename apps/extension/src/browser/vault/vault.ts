import { Mutex } from 'async-mutex'
import { getNoneSharedStore } from 'packages/ui/src/services/state'
import { sharedStore } from 'packages/ui/src/store'
import type { Keystore } from 'packages/ui/src/store/types'

import { CryptoService } from '@src/crypto/crypto'
import type { Data } from '@src/types/vault'

import { getSelectedKeystore } from './keystore'
import { getSecret, removeSecret, saveSecret } from './storage'

type WalletData = {
	timer: NodeJS.Timeout
	keystore: Keystore
	data: Data
}

export class Vault {
	private mutex: Mutex

	private crypto: CryptoService

	private wallet: WalletData | null

	constructor(crypto: Crypto) {
		this.crypto = new CryptoService(crypto)
		this.mutex = new Mutex()
		this.wallet = null
	}

	get = async (password: string): Promise<Data> => {
		if (!password) {
			throw new Error('Missing password')
		}
		const keystore = getSelectedKeystore()
		if (!keystore) {
			throw new Error('Keystore is not selected')
		}

		const secret = await getSecret(keystore)
		try {
			const data = await this.crypto.decrypt<Data>(password, secret)

			const { selectKeystoreId } = sharedStore.getState()
			const noneSharedStore = await getNoneSharedStore(selectKeystoreId)
			const { walletUnlockTimeoutInMinutes = 5 } = noneSharedStore.getState()

			const release = await this.mutex.acquire()
			if (this.wallet) {
				clearTimeout(this.wallet.timer)
			}
			this.wallet = { keystore, data, timer: setTimeout(this.lock, walletUnlockTimeoutInMinutes * 60 * 1000) }
			release()
		} catch (error) {
			this.lock()
			throw error
		}

		return this.wallet.data
	}

	save = async (keystore: Keystore, data: Data, password: string): Promise<Data> => {
		if (!password) {
			throw new Error('Missing password')
		}
		const selected = getSelectedKeystore()
		if (!selected) {
			throw new Error('Keystore is not selected')
		}
		if (keystore.id !== selected.id) {
			throw new Error('Forbidden!')
		}

		const secret = await this.crypto.encrypt<Data>(password, data)
		await saveSecret(keystore, secret)

		return this.get(password)
	}

	remove = async (password: string) => {
		if (!password) {
			throw new Error('Missing password')
		}
		if (!this.wallet) {
			throw new Error('Locked')
		}

		const keystore = getSelectedKeystore()
		if (!keystore) {
			throw new Error('Keystore is not selected')
		}
		if (this.wallet?.keystore.id !== keystore.id) {
			throw new Error('Forbidden!')
		}

		try {
			// check if we can decrypt
			const secret = await getSecret(keystore)
			await this.crypto.decrypt<Data>(password, secret)
			await removeSecret(keystore)
		} finally {
			const release = await this.mutex.acquire()
			this.lock()
			release()
		}
	}

	// returns wallet.data or null if locked
	// wallet.data should not leave sw scope, will extend unlocked timer
	getWalletData = async (): Promise<Data | null> => {
		if (!this.wallet) {
			return null
		}

		const keystore = getSelectedKeystore()
		if (!keystore) {
			throw new Error('Keystore is not selected')
		}
		if (this.wallet?.keystore.id !== keystore.id) {
			throw new Error('Forbidden!')
		}

		await this.restartTimer()

		return this.wallet.data
	}

	private restartTimer = async () => {
		const { selectKeystoreId } = sharedStore.getState()
		const noneSharedStore = await getNoneSharedStore(selectKeystoreId)
		const { walletUnlockTimeoutInMinutes = 5 } = noneSharedStore.getState()

		const release = await this.mutex.acquire()
		if (!this.wallet) {
			release()
			return
		}

		clearTimeout(this.wallet.timer)
		this.wallet.timer = setTimeout(this.lock, walletUnlockTimeoutInMinutes * 60 * 1000)
		release()
	}

	private lock = async () => {
		const release = await this.mutex.acquire()
		if (this.wallet?.timer) {
			clearTimeout(this.wallet.timer)
		}
		this.wallet = null
		release()
	}
}
