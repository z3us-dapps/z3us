import { HDPathRadix, Signature } from '@radixdlt/crypto'
import {
	PublicKeyT,
	SigningKeyDecryptionInput,
	SigningKeyEncryptionInput,
	BuiltTransactionReadyToSign,
	SigningKey as RadixSigningKey,
} from '@radixdlt/application'
import { KeystoreType, SigningKey } from '@src/types'
import { MessageService } from '@src/services/messanger'
import { DECRYPT, ENCRYPT, SIGN, SIGN_HASH } from '@src/lib/v1/actions'
import { HardwareWalletT } from '@radixdlt/hardware-wallet'
import { firstValueFrom } from 'rxjs'
import { generateId } from '@src/utils/generate-id'

export const createLocalSigningKey = (messanger: MessageService, publicKey: PublicKeyT): SigningKey => ({
	id: generateId(),
	type: KeystoreType.LOCAL,
	publicKey,
	decrypt: (input: SigningKeyDecryptionInput) =>
		messanger.sendActionMessageFromPopup(DECRYPT, {
			message: input.encryptedMessage,
			publicKeyOfOtherParty: input.publicKeyOfOtherParty.toString(),
		}),
	encrypt: (input: SigningKeyEncryptionInput) =>
		messanger.sendActionMessageFromPopup(ENCRYPT, {
			plaintext: input.plaintext,
			publicKeyOfOtherParty: input.publicKeyOfOtherParty.toString(),
		}),
	sign: async (tx: BuiltTransactionReadyToSign, nonXrdHRP?: string) => {
		const signatureDER = await messanger.sendActionMessageFromPopup(SIGN, {
			blob: tx.blob,
			hashOfBlobToSign: tx.hashOfBlobToSign,
			nonXrdHRP,
		})
		const signatureResult = Signature.fromDER(signatureDER)
		if (!signatureResult.isOk()) throw signatureResult.error
		return signatureResult.value
	},
	signHash: async (hashedMessage: Buffer) => {
		const signatureDER = await messanger.sendActionMessageFromPopup(SIGN_HASH, {
			hash: hashedMessage.toString('hex'),
		})
		const signatureResult = Signature.fromDER(signatureDER)
		if (!signatureResult.isOk()) throw signatureResult.error
		return signatureResult.value
	},
})

export const createHardwareSigningKey = async (hw: HardwareWalletT, index: number): Promise<SigningKey> => {
	const hdPath = HDPathRadix.create({ address: { index, isHardened: true } })
	const hardwareSigningKey = await firstValueFrom(hw.makeSigningKey(hdPath, false))

	const radixSK = RadixSigningKey.fromHDPathWithHWSigningKey({ hdPath, hardwareSigningKey })

	return {
		id: generateId(),
		type: KeystoreType.HARDWARE,
		hw,
		publicKey: radixSK.publicKey,
		decrypt: (input: SigningKeyDecryptionInput) => firstValueFrom(radixSK.decrypt(input)),
		encrypt: async (input: SigningKeyEncryptionInput) => {
			const message = await firstValueFrom(radixSK.encrypt(input))
			return message.combined().toString('hex')
		},
		sign: (tx: BuiltTransactionReadyToSign, nonXrdHRP?: string) => firstValueFrom(radixSK.sign(tx, nonXrdHRP)),
		signHash: (hashedMessage: Buffer) => firstValueFrom(radixSK.signHash(hashedMessage)),
	}
}
