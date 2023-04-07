import { Signature, sha256 } from '@radixdlt/application'
import { useCallback } from 'react'

import { useSharedStore } from '@src/hooks/use-store'

export const useSignature = () => {
	const { signingKey, addConfirmWithHWToast } = useSharedStore(state => ({
		signingKey: state.signingKey,
		addConfirmWithHWToast: state.addConfirmWithHWToastAction,
	}))

	const sign = useCallback(
		async (payload: string | Buffer): Promise<string> => {
			if (!signingKey) throw new Error('Invalid signing key')

			const hashedMessage = sha256(payload)

			addConfirmWithHWToast()

			const signature = await signingKey.signHash(hashedMessage)
			return signature.toDER()
		},
		[signingKey?.id],
	)

	const verify = useCallback(
		(signatureDER: string, payload: string | Buffer): boolean => {
			if (!signingKey) throw new Error('Invalid signing key')

			const signatureResult = Signature.fromDER(signatureDER)
			if (!signatureResult.isOk()) throw signatureResult.error

			return signingKey.publicKey.isValidSignature({
				signature: signatureResult.value,
				hashedMessage: sha256(payload),
			})
		},
		[signingKey?.id],
	)

	return {
		sign,
		verify,
	}
}
