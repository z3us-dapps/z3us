/* eslint-disable no-case-declarations */
import {
	AccountAddress,
	BuiltTransactionReadyToSign,
	HDSigningKeyTypeIdentifier,
	Mnemonic,
	SigningKeyDecryptionInput,
	SigningKeyEncryptionInput,
	SigningKeyTypeHDT,
	SigningKeyTypeIdentifier,
	SigningKeyTypeT,
} from '@radixdlt/application'
import {
	HDMasterSeed,
	HDNode,
	HDNodeT,
	HDPathRadix,
	MnemomicT,
	KeystoreT,
	Keystore as RadixKeystore,
	PublicKey,
	SignatureT,
	PublicKeyT,
	HDPathRadixT,
	DiffieHellman,
	MessageEncryption,
	EncryptedMessageT,
} from '@radixdlt/crypto'
import { CryptoService } from '@src/services/crypto'
import { BrowserStorageService } from '@src/services/browser-storage'
import { sharedStore } from '@src/store'
import { AddressBookEntry, Network } from '@src/store/types'
import { getDefaultAddressEntry } from '@src/store/helpers'
import { SigningKeyType, Keystore as AppKeystore, KeystoreType } from '@src/types'
import { getNoneSharedStore } from './state'

interface Keystore {
	type: SigningKeyType
	secret: string
}

type SecureRandom = {
	randomSecureBytes: (byteCount: number) => string
}

type SigningKeyT = Readonly<{
	// useful for testing.
	__diffieHellman: DiffieHellman

	// Type of signingKey: `SigningKeyTypeHDT` or `SigningKeyTypeNonHDT`, where HD has `hdSigningKeyType` which can be `LOCAL` or `HARDWARE_OR_REMOTE` (e.g. Ledger Nano)
	type: SigningKeyTypeT
	publicKey: PublicKeyT

	// Only relevant for Hardware accounts. Like property `publicKey` but a function and omits BIP32 path on HW display
	// For NON-Hardware accounts this will just return the cached `publicKey` property.
	getPublicKeyDisplayOnlyAddress: () => PublicKeyT

	// sugar for `type.uniqueKey`
	uniqueIdentifier: string

	// Useful for debugging.
	toString: () => string

	// Sugar for thisSigningKey.publicKey.equals(other.publicKey)
	equals: (other: SigningKeyT) => boolean

	// Sugar for `type.hdPath`, iff, type.typeIdentifier === SigningKeyTypeHDT
	hdPath?: HDPathRadixT

	// Sugar for `type.isHDSigningKey`
	isHDSigningKey: boolean
	// Sugar for `type.isHardwareSigningKey`
	isHardwareSigningKey: boolean
	// Sugar for `isHDSigningKey && !isHardwareSigningKey`
	isLocalHDSigningKey: boolean

	signHash: (hashedMessage: Buffer) => Promise<SignatureT>
	sign: (tx: BuiltTransactionReadyToSign, nonXrdHRP?: string) => Promise<SignatureT>
	encrypt: (input: SigningKeyEncryptionInput) => Promise<EncryptedMessageT>
	decrypt: (input: SigningKeyDecryptionInput) => Promise<string>
}>

export const keystoreKey = 'z3us-keystore'

const toPromise = <T>(asyncResult): Promise<T> =>
	new Promise((resolve, rejevct) => {
		asyncResult.then(res => res.match(resolve, rejevct))
	})

const makeSigningKeyTypeHD = (
	input: Readonly<{
		hdPath: HDPathRadixT
		hdSigningKeyType: HDSigningKeyTypeIdentifier
	}>,
): SigningKeyTypeHDT => {
	const { hdPath, hdSigningKeyType } = input
	const isHardwareSigningKey = hdSigningKeyType === HDSigningKeyTypeIdentifier.HARDWARE_OR_REMOTE
	const uniqueKey = `${isHardwareSigningKey ? 'Hardware' : 'Local'}_HD_signingKey_at_path_${hdPath.toString()}`
	return {
		typeIdentifier: SigningKeyTypeIdentifier.HD_SIGNING_KEY,
		hdSigningKeyType,
		hdPath,
		uniqueKey,
		isHDSigningKey: true,
		isHardwareSigningKey,
	}
}

const makeDecrypt =
	(diffieHellman: DiffieHellman) =>
	(input: SigningKeyDecryptionInput): Promise<string> =>
		toPromise(
			MessageEncryption.decrypt({
				...input,
				diffieHellmanPoint: () => diffieHellman(input.publicKeyOfOtherParty),
			}).map((buf: Buffer) => buf.toString('utf-8')),
		)

const makeEncrypt =
	(diffieHellman: DiffieHellman, secureRandom: SecureRandom) =>
	(input: SigningKeyEncryptionInput): Promise<EncryptedMessageT> =>
		toPromise(
			MessageEncryption.encrypt({
				secureRandom,
				plaintext: input.plaintext,
				diffieHellmanPoint: () => diffieHellman(input.publicKeyOfOtherParty),
			}),
		)

const getSigningKey = (hdMasterNode: HDNodeT, index: number, secureRandom: SecureRandom): SigningKeyT => {
	const hdPath = HDPathRadix.create({ address: { index, isHardened: true } })
	const hdNodeAtPath = hdMasterNode.derive(hdPath)
	const publicKey = hdNodeAtPath.privateKey.publicKey()

	const sign = (tx: BuiltTransactionReadyToSign): Promise<SignatureT> =>
		toPromise(hdNodeAtPath.privateKey.sign(Buffer.from(tx.hashOfBlobToSign, 'hex')))

	const { diffieHellman } = hdNodeAtPath.privateKey

	const type: SigningKeyTypeT = makeSigningKeyTypeHD({
		hdPath,
		hdSigningKeyType: HDSigningKeyTypeIdentifier.LOCAL,
	})

	return {
		...type, // forward sugar for boolean signingKey type getters
		isLocalHDSigningKey: type.isHDSigningKey && !type.isHardwareSigningKey,
		decrypt: makeDecrypt(diffieHellman),
		encrypt: makeEncrypt(diffieHellman, secureRandom),
		sign,
		signHash: (hashedMessage: Buffer): Promise<SignatureT> => toPromise(hdNodeAtPath.privateKey.sign(hashedMessage)),
		hdPath,
		publicKey,
		getPublicKeyDisplayOnlyAddress: (): PublicKeyT => publicKey,
		type,
		uniqueIdentifier: type.uniqueKey,
		toString: (): string => {
			throw new Error('Overriden below')
		},
		equals: (other: SigningKeyT): boolean => publicKey.equals(other.publicKey),
		__diffieHellman: diffieHellman,
	}
}

export class VaultService {
	private crypto: CryptoService

	private storage: BrowserStorageService

	private isUnlocked: boolean = false

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

		return this.unlock(password, index)
	}

	unlock = async (password: string, index: number) => {
		const { secret, keystore } = await this.getSecret()
		const { hdMasterNode, type: signingKeyType } = await this.getHDMasterNode(secret, password, keystore)

		this.signingKeyType = signingKeyType
		this.hdMasterNode = hdMasterNode
		this.isUnlocked = !!hdMasterNode || signingKeyType === SigningKeyType.HARDWARE

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
		this.isUnlocked = false
	}

	derive = async (index: number, network?: Network, publicAddresses?: { [key: number]: AddressBookEntry }) => {
		await sharedStore.persist.rehydrate()
		const { selectKeystoreId } = sharedStore.getState()
		const hasKeystore = await this.has()

		if (!this.isUnlocked || this.signingKeyType === SigningKeyType.HARDWARE) {
			return {
				hasKeystore,
				keystoreId: selectKeystoreId,
				isUnlocked: this.isUnlocked,
			}
		}

		if (publicAddresses) {
			if (!network) throw new Error('Network is required when deriving all addresses')
			const publicIndexes = Object.keys(publicAddresses)
			if (index >= publicIndexes.length) {
				index = publicIndexes.length > 0 ? +publicIndexes[publicIndexes.length - 1] + 1 : 0
				publicIndexes.push(`${index}`)
			}

			publicIndexes.forEach(key => {
				const idx = +key
				const signingKey = getSigningKey(this.hdMasterNode, idx, this.crypto)
				if (idx === index) {
					this.signingKey = signingKey
				}

				const address = AccountAddress.fromPublicKeyAndNetwork({
					publicKey: signingKey.publicKey,
					network: network.id,
				})

				publicAddresses[idx] = {
					...getDefaultAddressEntry(idx),
					...publicAddresses[idx],
					address: address.toString(),
				}
			})
		} else {
			const signingKey = getSigningKey(this.hdMasterNode, index, this.crypto)
			this.signingKey = signingKey
		}

		await this.resetTimer()
		return {
			isUnlocked: this.isUnlocked,
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
		const { secret, keystore } = await this.getSecret()
		const { type: signingKeyType, hdMasterNode, mnemonic } = await this.getHDMasterNode(secret, password, keystore)

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
			hdMasterNode: hdMasterNode?.toJSON(),
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

		const ecnrypted = await this.signingKey.encrypt({
			plaintext,
			publicKeyOfOtherParty: publicKeyResult.value,
		})

		return ecnrypted.combined().toString('hex')
	}

	decrypt = async (message: string, publicKeyOfOtherParty: string) => {
		if (!this.signingKey) throw new Error('Unauthorised!')

		const publicKeyBuffer = Buffer.from(publicKeyOfOtherParty, 'hex')
		const publicKeyResult = PublicKey.fromBuffer(publicKeyBuffer)
		if (!publicKeyResult.isOk()) {
			throw publicKeyResult.error
		}

		return this.signingKey.decrypt({
			encryptedMessage: Buffer.from(message, 'hex'),
			publicKeyOfOtherParty: publicKeyResult.value,
		})
	}

	sign = async (blob: string, hashOfBlobToSign: string, nonXrdHRP: string = undefined) => {
		if (!this.signingKey) throw new Error('Unauthorised!')

		const signature = await this.signingKey.sign({ blob, hashOfBlobToSign }, nonXrdHRP)
		return signature.toDER()
	}

	signHash = async (hash: string) => {
		if (!this.signingKey) throw new Error('Unauthorised!')

		const signature = await this.signingKey.signHash(Buffer.from(hash, 'hex'))
		return signature.toDER()
	}

	private saveKeystore = async (keystore: string) => {
		await sharedStore.persist.rehydrate()
		const { selectKeystoreId } = sharedStore.getState()
		await this.storage.setItem(`${keystoreKey}-${selectKeystoreId}`, keystore)
	}

	private getSecret = async (): Promise<{ keystore?: AppKeystore; secret: string }> => {
		await sharedStore.persist.rehydrate()
		const { selectKeystoreId, keystores } = sharedStore.getState()
		const secret = await this.storage.getItem(`${keystoreKey}-${selectKeystoreId}`)
		const keystore = keystores.find(({ id }) => id === selectKeystoreId)
		return { keystore, secret }
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
		secret: string,
		password: string,
		key?: AppKeystore,
	): Promise<{
		type: SigningKeyType
		hdMasterNode: HDNodeT
		mnemonic?: MnemomicT
	}> => {
		if (!secret && key?.type === KeystoreType.HARDWARE) return { type: SigningKeyType.HARDWARE, hdMasterNode: null }

		let keystore = await this.crypto.decrypt<Keystore>(password, secret)
		// migrate data if is legacy keystore
		if (keystore === false) {
			const kesytoreResult = await RadixKeystore.decrypt({ keystore: JSON.parse(secret) as KeystoreT, password })
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
			case SigningKeyType.HARDWARE:
				return { type: keystore.type, hdMasterNode: null }
			default:
				throw new Error(`Invalid keystore type`)
		}
	}
}
