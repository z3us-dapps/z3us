import { Mutex } from 'async-mutex'

import { getNoneSharedStore } from 'ui/src/services/state'
import { sharedStore } from 'ui/src/store'
import { type Keystore } from 'ui/src/store/types'

import { CryptoService } from '@src/crypto/crypto'
import type { Data } from '@src/types/vault'

import { getSecret, removeSecret, saveSecret } from './storage'

type WalletData = {
	timer?: NodeJS.Timeout
	runtimeId: string
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

	checkPassword = async (keystore: Keystore, password: string): Promise<WalletData> => {
		const release = await this.mutex.acquire()
		try {
			const secret = await getSecret(keystore.id)
			if (secret) await this.crypto.decrypt<Data>(password, secret)
		} finally {
			release()
		}

		return this.wallet
	}

	unlock = async (keystore: Keystore, runtimeId: string, password: string): Promise<WalletData> => {
		const release = await this.mutex.acquire()
		try {
			const secret = await getSecret(keystore.id)
			const data = secret ? await this.crypto.decrypt<Data>(password, secret) : null

			const noneSharedStore = await getNoneSharedStore(keystore.id)
			await noneSharedStore.persist.rehydrate()
			const { walletUnlockTimeoutInMinutes } = noneSharedStore.getState()

			if (this.wallet?.timer) {
				clearTimeout(this.wallet.timer)
			}
			this.wallet = { keystore, data, runtimeId }
			if (walletUnlockTimeoutInMinutes > 0) {
				this.wallet.timer = setTimeout(this.lock, walletUnlockTimeoutInMinutes * 60 * 1000)
			}
		} catch (error) {
			await this.clearState()
			throw error
		} finally {
			release()
		}

		return this.wallet
	}

	get = async (runtimeId: string): Promise<WalletData | null> => {
		const release = await this.mutex.acquire()
		try {
			if (!this.wallet) {
				await this.clearState()
			}
		} finally {
			release()

			await this.restartTimer(runtimeId)
		}

		return this.wallet
	}

	save = async (keystore: Keystore, data: Data, password: string): Promise<void> => {
		const release = await this.mutex.acquire()
		try {
			// check if we can decrypt
			const old = await getSecret(keystore.id)
			if (old) await this.crypto.decrypt<Data>(password, old)

			const secret = await this.crypto.encrypt<Data>(password, data)
			await saveSecret(keystore.id, secret)

			if (this.wallet?.keystore.id === keystore.id) {
				this.wallet.keystore = keystore
				this.wallet.data = data
			}
		} catch (error) {
			await this.clearState()
			throw error
		} finally {
			release()
		}
	}

	remove = async (keystore: Keystore, password: string) => {
		const release = await this.mutex.acquire()
		try {
			if (!this.wallet) {
				throw new Error('Locked')
			}

			// check if we can decrypt
			const secret = await getSecret(keystore.id)
			if (secret) await this.crypto.decrypt<Data>(password, secret)
			await removeSecret(keystore.id)
			await this.clearState()
		} finally {
			release()
		}
	}

	lock = async () => {
		const release = await this.mutex.acquire()
		try {
			await this.clearState()
		} finally {
			release()
		}
	}

	private lockOnTimer = async () => {
		const release = await this.mutex.acquire()
		try {
			if (!this.wallet) {
				return
			}

			await sharedStore.persist.rehydrate()
			const { selectedKeystoreId } = sharedStore.getState()

			const noneSharedStore = await getNoneSharedStore(selectedKeystoreId)
			await noneSharedStore.persist.rehydrate()
			const { walletUnlockTimeoutInMinutes } = noneSharedStore.getState()

			if (this.wallet?.keystore.id !== selectedKeystoreId) {
				// eslint-disable-next-line no-console
				console.error(
					`Vault.lockOnTimer memory keystore ${this.wallet?.keystore.id} !== selected keystore ${selectedKeystoreId}`,
				)
			} else if (walletUnlockTimeoutInMinutes > 0) {
				await this.clearState()
			}
		} finally {
			release()
		}
	}

	private restartTimer = async (currentRuntimeId: string) => {
		const release = await this.mutex.acquire()
		try {
			if (!this.wallet) {
				return
			}

			const { runtimeId, timer } = this.wallet
			await sharedStore.persist.rehydrate()
			const { selectedKeystoreId } = sharedStore.getState()

			const noneSharedStore = await getNoneSharedStore(selectedKeystoreId)
			await noneSharedStore.persist.rehydrate()
			const { walletUnlockTimeoutInMinutes } = noneSharedStore.getState()

			if (walletUnlockTimeoutInMinutes === -1 && currentRuntimeId !== runtimeId) {
				await this.clearState()
			} else {
				if (timer) {
					clearTimeout(timer)
				}
				if (walletUnlockTimeoutInMinutes > 0) {
					this.wallet.timer = setTimeout(this.lockOnTimer, walletUnlockTimeoutInMinutes * 60 * 1000)
				}
			}
		} catch (error) {
			await this.lock()
			throw error
		} finally {
			release()
		}
	}

	private clearState = async () => {
		if (this.wallet?.timer) {
			clearTimeout(this.wallet.timer)
		}
		this.wallet = null
	}
}
