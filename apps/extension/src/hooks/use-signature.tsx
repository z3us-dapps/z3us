import { useCallback } from 'react'
import { sha256, Signature } from '@radixdlt/application'
import { useStore } from '@src/store'

export const useSignature = () => {
	const { account } = useStore(state => ({
		account: state.account,
	}))

	const sign = useCallback(
		async (payload: string | Buffer): Promise<string> => {
			const hashedMessage = sha256(payload)
			const signature = await account.signHash(hashedMessage).toPromise()
			return signature.toDER()
		},
		[account],
	)

	const verify = useCallback(
		(signatureDER: string, payload: string | Buffer): boolean => {
			const signatureResult = Signature.fromDER(signatureDER)
			if (!signatureResult.isOk()) throw signatureResult.error

			return account.publicKey.isValidSignature({
				signature: signatureResult.value,
				hashedMessage: sha256(payload),
			})
		},
		[account],
	)

	return {
		sign,
		verify,
	}
}
