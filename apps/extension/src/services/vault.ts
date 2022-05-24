import browser from 'webextension-polyfill'
import { Mnemonic, KeystoreT } from '@radixdlt/application'
import {
	AES_GCM,
	Scrypt,
	ScryptParams,
	ScryptParamsT,
	sha256,
	HDMasterSeed,
	Keystore,
	HDMasterSeedT,
	MnemomicT,
	MnemonicProps,
} from '@radixdlt/crypto'
import { sharedStore } from '@src/store'
import { BrowserStorageService } from '@src/services/browser-storage'
import { sharedStoreKey } from '@src/config'
import { SharedStore } from '@src/store/types'

const keystoreKey = 'z3us-keystore'

const getKeystorePrefix = async () => {
	const data = await browser.storage.local.get(sharedStoreKey)
	const { lastError } = browser.runtime
	if (lastError) {
		// eslint-disable-next-line @typescript-eslint/no-throw-literal
		throw lastError
	}
	if (!data[sharedStoreKey]) {
		return ''
	}
	const state = JSON.parse(data[sharedStoreKey])?.state as SharedStore
	return state?.selectKeystoreName || ''
}

export class VaultService {
	private crypto: Crypto

	private storage: BrowserStorageService

	private masterSeed?: HDMasterSeedT

	private mnemonic?: MnemomicT

	private timer?: NodeJS.Timeout

	constructor(storage: BrowserStorageService, crypto: Crypto) {
		this.storage = storage
		this.crypto = crypto
	}

	has = async (): Promise<boolean> => {
		try {
			const keystore = await this.storage.getItem(keystoreKey)
			return !!keystore
		} catch (err) {
			return false
		}
	}

	get = async () => {
		if (!this.masterSeed) {
			const hasKeystore = await this.has()
			return {
				hasKeystore,
			}
		}
		return this.reload()
	}

	new = async (password: string, mneomnicVal: string[]) => {
		const mnemomicRes = await Mnemonic.fromEnglishWords(mneomnicVal)
		if (mnemomicRes.isErr()) {
			throw mnemomicRes.error
		}

		const keystore = await this.encrypt({
			secret: mnemomicRes.value.entropy,
			password,
		})

		await this.saveKeystore(keystore)

		await this.load(keystore, password)
		return this.reload()
	}

	lock = () => {
		if (this.timer) {
			clearTimeout(this.timer)
		}
		this.masterSeed = null
		this.timer = null
	}

	unlock = async (password: string) => {
		const keystore = await this.loadKeystore()
		await this.load(keystore, password)
		return this.reload()
	}

	remove = async () => {
		const suffix = await getKeystorePrefix()
		await this.lock()
		await this.storage.removeItem(suffix ? `${keystoreKey}-${suffix}` : keystoreKey)
	}

	private load = async (keystore: KeystoreT, password: string) => {
		const kesytore = await Keystore.decrypt({ keystore, password })
		if (kesytore.isErr()) {
			throw kesytore.error
		}

		const mnemonic = Mnemonic.fromEntropy({ entropy: kesytore.value })
		if (mnemonic.isErr()) {
			throw mnemonic.error
		}

		this.mnemonic = mnemonic.value
		this.masterSeed = HDMasterSeed.fromMnemonic({ mnemonic: mnemonic.value })
	}

	private reload = async () => {
		await this.resetTimer()

		const hasKeystore = await this.has()

		return {
			mnemonic: {
				strength: this.mnemonic.strength,
				entropy: this.mnemonic.entropy,
				words: this.mnemonic.words,
				phrase: this.mnemonic.phrase,
				language: this.mnemonic.language,
			} as MnemonicProps,
			seed: this.masterSeed.seed.toString('hex'),
			hasKeystore,
		}
	}

	private saveKeystore = async (keystore: KeystoreT) => {
		const suffix = await getKeystorePrefix()
		await this.storage.setItem(suffix ? `${keystoreKey}-${suffix}` : keystoreKey, JSON.stringify(keystore, null, '\t'))
	}

	private loadKeystore = async (): Promise<KeystoreT> => {
		const suffix = await getKeystorePrefix()
		const data = await this.storage.getItem(suffix ? `${keystoreKey}-${suffix}` : keystoreKey)
		if (!data) {
			throw new Error('No keystore!')
		}
		return JSON.parse(data) as KeystoreT
	}

	private resetTimer = async () => {
		const { walletUnlockTimeoutInMinutes = 5 } = sharedStore.getState()
		if (this.timer) {
			clearTimeout(this.timer)
		}

		this.timer = setTimeout(() => this.lock(), walletUnlockTimeoutInMinutes * 60 * 1000)
	}

	private randomSecureBytes = (byteCount: number) => {
		const bytes = this.crypto.getRandomValues(new Uint8Array(byteCount))
		const buffer = Buffer.from(bytes)
		const byteArray = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength / Uint8Array.BYTES_PER_ELEMENT)
		let byteString = ''
		for (let i = 0; i < byteCount; i += 1) {
			byteString += `00${byteArray[i].toString(16)}`.slice(-2)
		}

		return byteString
	}

	private encrypt = async (
		input: Readonly<{
			secret: Buffer
			password: string
			memo?: string // e.g. 'Business wallet' or 'My husbands wallet' etc.
			kdf?: string
			kdfParams?: ScryptParamsT
		}>,
	): Promise<KeystoreT> => {
		const secureRandom = {
			randomSecureBytes: this.randomSecureBytes,
		}

		const kdf = input.kdf ?? 'scrypt'
		const params = input.kdfParams ?? ScryptParams.create({ secureRandom })
		const memo = input.memo ?? Date.now().toLocaleString()

		const derivedKeyResult = await Scrypt.deriveKey({ kdf, params, password: Buffer.from(input.password) })
		if (derivedKeyResult.isErr()) {
			throw derivedKeyResult.error
		}
		const sealedBoxResult = AES_GCM.seal({
			secureRandom,
			plaintext: input.secret,
			symmetricKey: derivedKeyResult.value,
		})
		if (sealedBoxResult.isErr()) {
			throw sealedBoxResult.error
		}

		const cipherText = sealedBoxResult.value.ciphertext
		const mac = sealedBoxResult.value.authTag

		const id = sha256(cipherText).toString('hex').slice(-16)

		return {
			memo,
			crypto: {
				cipher: AES_GCM.algorithm,
				cipherparams: {
					nonce: sealedBoxResult.value.nonce.toString('hex'),
				},
				ciphertext: cipherText.toString('hex'),
				kdf,
				kdfparams: params,
				mac: mac.toString('hex'),
			},
			id,
			version: 1,
		}
	}
}
