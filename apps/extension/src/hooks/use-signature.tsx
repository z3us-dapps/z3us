import { useCallback } from 'react'
import { sha256, Signature } from '@radixdlt/application'
import { useSharedStore, useAccountStore } from '@src/hooks/use-store'

export const useSignature = () => {
	const { addConfirmWithHWToast } = useSharedStore(state => ({
		addConfirmWithHWToast: state.addConfirmWithHWToastAction,
	}))
	const { signingKey } = useAccountStore(state => ({
		signingKey: state.signingKey,
	}))

	const sign = useCallback(
		async (payload: string | Buffer): Promise<string> => {
			const hashedMessage = sha256(payload)

			addConfirmWithHWToast()

			const signature = await signingKey.signHash(hashedMessage)
			return signature.toDER()
		},
		[signingKey?.id],
	)

	const verify = useCallback(
		(signatureDER: string, payload: string | Buffer): boolean => {
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
