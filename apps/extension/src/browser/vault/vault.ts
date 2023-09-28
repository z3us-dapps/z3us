import { Mutex } from 'async-mutex'

import { getNoneSharedStore } from 'ui/src/services/state'
import { sharedStore } from 'ui/src/store'
import { type Keystore, KeystoreType } from 'ui/src/store/types'

import { CryptoService } from '@src/crypto/crypto'
import type { Data } from '@src/types/vault'

import { getSelectedKeystore } from './keystore'
import { getSecret, removeSecret, saveSecret, setConnectionPassword } from './storage'

type WalletData = {
	timer?: NodeJS.Timeout
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

	checkPassword = async (password: string): Promise<WalletData> => {
		const release = await this.mutex.acquire()
		try {
			const keystore = await getSelectedKeystore()
			if (!keystore) {
				throw new Error('Keystore is not selected')
			}

			const secret = await getSecret(keystore.id)
			if (secret) await this.crypto.decrypt<Data>(password, secret)
		} finally {
			release()
		}

		return this.wallet
	}

	unlock = async (password: string): Promise<WalletData> => {
		const release = await this.mutex.acquire()
		try {
			const keystore = await getSelectedKeystore()
			if (!keystore) {
				throw new Error('Keystore is not selected')
			}

			const secret = await getSecret(keystore.id)
			const data = secret ? await this.crypto.decrypt<Data>(password, secret) : null

			const noneSharedStore = await getNoneSharedStore(keystore.id)
			await noneSharedStore.persist.rehydrate()
			const { walletUnlockTimeoutInMinutes } = noneSharedStore.getState()

			if (this.wallet?.timer) {
				clearTimeout(this.wallet.timer)
			}
			this.wallet = { keystore, data }
			if (walletUnlockTimeoutInMinutes > 0) {
				this.wallet.timer = setTimeout(this.lock, walletUnlockTimeoutInMinutes * 60 * 1000)
			}
			await this.setConnectionPassword()
		} catch (error) {
			await this.clearState()
			throw error
		} finally {
			release()
		}

		return this.wallet
	}

	get = async (): Promise<WalletData | null> => {
		const release = await this.mutex.acquire()
		try {
			if (this.wallet) {
				const keystore = await getSelectedKeystore()
				if (!keystore) {
					throw new Error('Keystore is not selected')
				}
				if (this.wallet?.keystore.id !== keystore.id) {
					throw new Error('Forbidden!')
				}
			}
		} catch (error) {
			await this.clearState()
			throw error
		} finally {
			release()

			await this.restartTimer()
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
		} catch (error) {
			await this.clearState()
			throw error
		} finally {
			release()
		}
	}

	remove = async (password: string) => {
		const release = await this.mutex.acquire()
		try {
			if (!this.wallet) {
				throw new Error('Locked')
			}

			const keystore = await getSelectedKeystore()
			if (!keystore) {
				throw new Error('Keystore is not selected')
			}
			if (this.wallet?.keystore.id !== keystore.id) {
				throw new Error('Forbidden!')
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

	private clearState = async () => {
		if (this.wallet?.timer) {
			clearTimeout(this.wallet.timer)
		}
		this.wallet = null
		await this.setConnectionPassword()
	}

	private restartTimer = async () => {
		if (this.wallet) {
			await sharedStore.persist.rehydrate()
			const { selectedKeystoreId } = sharedStore.getState()

			const noneSharedStore = await getNoneSharedStore(selectedKeystoreId)
			await noneSharedStore.persist.rehydrate()
			const { walletUnlockTimeoutInMinutes } = noneSharedStore.getState()

			const release = await this.mutex.acquire()
			try {
				if (this.wallet?.timer) {
					clearTimeout(this.wallet.timer)
				}
				if (this.wallet && walletUnlockTimeoutInMinutes > 0) {
					this.wallet.timer = setTimeout(this.lock, walletUnlockTimeoutInMinutes * 60 * 1000)
				}
			} catch (error) {
				await this.lock()
				throw error
			} finally {
				release()
			}
		}
	}

	private setConnectionPassword = async () => {
		switch (this.wallet?.keystore.type) {
			case KeystoreType.RADIX_WALLET:
				await setConnectionPassword(this.wallet.data?.secret || '')
				break
			case KeystoreType.LOCAL:
				await setConnectionPassword('')
				break
			case KeystoreType.HARDWARE:
				await setConnectionPassword('')
				break
			default:
			// we do not reset password on lock here to let connect button send events to radix mobile
			// await setConnectionPassword('')
		}
	}
}
