/* eslint-disable no-case-declarations */
import { AccountAddress, Mnemonic, SigningKey, SigningKeyT } from '@radixdlt/application'
import {
	HDMasterSeed,
	HDNode,
	HDNodeT,
	HDPathRadix,
	MnemomicT,
	KeystoreT,
	Keystore as RadixKeystore,
	PublicKey,
} from '@radixdlt/crypto'
import { CryptoService } from '@src/services/crypto'
import { BrowserStorageService } from '@src/services/browser-storage'
import { sharedStore } from '@src/store'
import { AddressBookEntry, Network } from '@src/store/types'
import { getDefaultAddressEntry } from '@src/store/helpers'
import { firstValueFrom } from 'rxjs'
import { SigningKeyType } from '@src/types'
import { getNoneSharedStore } from './state'

interface Keystore {
	type: SigningKeyType
	secret: string
}

export const keystoreKey = 'z3us-keystore'

const getSigningKey = (hdMasterNode: HDNodeT, index: number): SigningKeyT => {
	const hdPath = HDPathRadix.create({ address: { index, isHardened: true } })
	return SigningKey.fromHDPathWithHDMasterNode({ hdPath, hdMasterNode })
}

export class VaultService {
	private crypto: CryptoService

	private storage: BrowserStorageService

	private hdMasterNode?: HDNodeT

	private signingKeyType?: SigningKeyType

	private signingKey?: SigningKeyT

	private timer?: NodeJS.Timeout

	constructor(storage: BrowserStorageService, crypto: Crypto) {
		this.storage = storage
		this.crypto = new CryptoService(crypto)
	}

	ping = async () => {
		if (this.timer) {
			await this.resetTimer()
		}
	}

	new = async (type: SigningKeyType, secret: string, password: string, index: number = 0) => {
		const keystore = await this.crypto.encrypt<Keystore>(password, { type, secret })
		await this.saveKeystore(keystore)

		const { hdMasterNode, type: signingKeyType } = await this.getHDMasterNode(keystore, password)
		this.signingKeyType = signingKeyType
		this.hdMasterNode = hdMasterNode
		return this.derive(index)
	}

	unlock = async (password: string, index: number) => {
		const keystore = await this.getKeystore()
		const { hdMasterNode, type: signingKeyType } = await this.getHDMasterNode(keystore, password)
		this.signingKeyType = signingKeyType
		this.hdMasterNode = hdMasterNode
		return this.derive(index)
	}

	lock = () => {
		if (this.timer) {
			clearTimeout(this.timer)
		}
		this.hdMasterNode = null
		this.signingKeyType = null
		this.signingKey = null
		this.timer = null
	}

	derive = async (index: number, network?: Network, publicAddresses?: { [key: number]: AddressBookEntry }) => {
		await sharedStore.persist.rehydrate()
		const { selectKeystoreId } = sharedStore.getState()
		const hasKeystore = await this.has()

		if (!this.hdMasterNode) {
			this.hdMasterNode = null
			this.signingKeyType = null
			this.signingKey = null
			return {
				hasKeystore,
				keystoreId: selectKeystoreId,
			}
		}

		if (publicAddresses) {
			if (!network) throw new Error('Network is required when deriving all addresses')
			const publicIndexes = Object.keys(publicAddresses)
			if (index >= publicIndexes.length) {
				index = publicIndexes.length > 0 ? +publicIndexes[publicIndexes.length - 1] + 1 : 0
				publicAddresses[index] = {} // will be updated with defaults in a loop below
			}

			publicIndexes.forEach(key => {
				const signingKey = getSigningKey(this.hdMasterNode, +key)
				if (+key === index) {
					this.signingKey = signingKey
				}

				const address = AccountAddress.fromPublicKeyAndNetwork({
					publicKey: signingKey.publicKey,
					network: network.id,
				})

				publicAddresses[key] = {
					...getDefaultAddressEntry(+key),
					...publicAddresses[key],
					address: address.toString(),
				}
			})
		} else {
			const signingKey = getSigningKey(this.hdMasterNode, index)
			this.signingKey = signingKey
		}

		await this.resetTimer()
		return {
			type: this.signingKeyType,
			hasKeystore,
			keystoreId: selectKeystoreId,
			publicKey: this.signingKey?.publicKey.toString(),
			network,
			publicAddresses,
		}
	}

	has = async (): Promise<boolean> => {
		try {
			await sharedStore.persist.rehydrate()
			const { selectKeystoreId } = sharedStore.getState()
			const keystore = await this.storage.getItem(`${keystoreKey}-${selectKeystoreId}`)
			return !!keystore
		} catch (err) {
			return false
		}
	}

	get = async (password: string) => {
		const keystore = await this.getKeystore()
		const { type: signingKeyType, hdMasterNode, mnemonic } = await this.getHDMasterNode(keystore, password)

		return {
			type: signingKeyType,
			mnemonic: mnemonic
				? {
						strength: mnemonic.strength,
						entropy: mnemonic.entropy.toString('hex'),
						words: mnemonic.words,
						phrase: mnemonic.phrase,
						language: mnemonic.language,
				  }
				: undefined,
			hdMasterNode: hdMasterNode.toJSON(),
		}
	}

	remove = async () => {
		await sharedStore.persist.rehydrate()
		const { selectKeystoreId } = sharedStore.getState()
		this.lock()
		await this.storage.removeItem(`${keystoreKey}-${selectKeystoreId}`)
	}

	encrypt = async (plaintext: string, publicKeyOfOtherParty: string) => {
		if (!this.signingKey) throw new Error('Unauthorised!')

		const publicKeyBuffer = Buffer.from(publicKeyOfOtherParty, 'hex')
		const publicKeyResult = PublicKey.fromBuffer(publicKeyBuffer)
		if (!publicKeyResult.isOk()) {
			throw publicKeyResult.error
		}

		const ecnrypted = await firstValueFrom(
			this.signingKey.encrypt({
				plaintext,
				publicKeyOfOtherParty: publicKeyResult.value,
			}),
		)
		return ecnrypted.combined().toString('hex')
	}

	decrypt = async (message: string, publicKeyOfOtherParty: string) => {
		if (!this.signingKey) throw new Error('Unauthorised!')

		const publicKeyBuffer = Buffer.from(publicKeyOfOtherParty, 'hex')
		const publicKeyResult = PublicKey.fromBuffer(publicKeyBuffer)
		if (!publicKeyResult.isOk()) {
			throw publicKeyResult.error
		}

		return firstValueFrom(
			this.signingKey.decrypt({
				encryptedMessage: Buffer.from(message, 'hex'),
				publicKeyOfOtherParty: publicKeyResult.value,
			}),
		)
	}

	sign = async (blob: string, hashOfBlobToSign: string, nonXrdHRP: string = undefined) => {
		if (!this.signingKey) throw new Error('Unauthorised!')

		const signature = await firstValueFrom(this.signingKey.sign({ blob, hashOfBlobToSign }, nonXrdHRP))
		return signature.toDER()
	}

	signHash = async (hash: string) => {
		if (!this.signingKey) throw new Error('Unauthorised!')

		const signature = await firstValueFrom(this.signingKey.signHash(Buffer.from(hash, 'hex')))
		return signature.toDER()
	}

	private saveKeystore = async (keystore: string) => {
		await sharedStore.persist.rehydrate()
		const { selectKeystoreId } = sharedStore.getState()
		await this.storage.setItem(`${keystoreKey}-${selectKeystoreId}`, keystore)
	}

	private getKeystore = async (): Promise<string> => {
		await sharedStore.persist.rehydrate()
		const { selectKeystoreId } = sharedStore.getState()
		const data = await this.storage.getItem(`${keystoreKey}-${selectKeystoreId}`)
		if (!data) {
			throw new Error('No keystore!')
		}
		return data
	}

	private resetTimer = async () => {
		await sharedStore.persist.rehydrate()
		const { selectKeystoreId } = sharedStore.getState()
		const noneSharedStore = await getNoneSharedStore(selectKeystoreId)
		await noneSharedStore.persist.rehydrate()
		const { walletUnlockTimeoutInMinutes = 5 } = noneSharedStore.getState()
		if (this.timer) {
			clearTimeout(this.timer)
		}

		this.timer = setTimeout(() => this.lock(), walletUnlockTimeoutInMinutes * 60 * 1000)
	}

	private getHDMasterNode = async (
		data: string,
		password: string,
	): Promise<{
		type: SigningKeyType
		hdMasterNode: HDNodeT
		mnemonic?: MnemomicT
	}> => {
		let keystore = await this.crypto.decrypt<Keystore>(password, data)
		// migrate data if is legacy keystore
		if (keystore === false) {
			const kesytoreResult = await RadixKeystore.decrypt({ keystore: JSON.parse(data) as KeystoreT, password })
			if (kesytoreResult.isErr()) {
				throw kesytoreResult.error
			}
			keystore = { type: SigningKeyType.LEGACY, secret: kesytoreResult.value.toString('hex') }
		} else {
			keystore = keystore as Keystore
		}

		switch (keystore.type) {
			case SigningKeyType.LEGACY:
				const newKeystore = await this.crypto.encrypt<Keystore>(password, {
					type: SigningKeyType.MNEMONIC,
					secret: keystore.secret,
				})
				await this.saveKeystore(newKeystore)
			// eslint-disable-next-line no-fallthrough
			case SigningKeyType.MNEMONIC:
				const mnemonic = Mnemonic.fromEntropy({ entropy: Buffer.from(keystore.secret, 'hex') })
				if (mnemonic.isErr()) {
					throw mnemonic.error
				}

				const masterSeed = HDMasterSeed.fromMnemonic({ mnemonic: mnemonic.value })

				return {
					type: keystore.type,
					mnemonic: mnemonic.value,
					hdMasterNode: masterSeed.masterNode(),
				}
			case SigningKeyType.PRIVATE_KEY:
				const hdNodeResult = HDNode.fromExtendedPrivateKey(keystore.secret)
				if (hdNodeResult.isErr()) {
					throw hdNodeResult.error
				}
				return { type: keystore.type, hdMasterNode: hdNodeResult.value }
			default:
				throw new Error(`Invalid keystore type`)
		}
	}
}
