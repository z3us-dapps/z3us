import { useCallback } from 'react'
import { firstValueFrom } from 'rxjs'
import { sha256, Signature } from '@radixdlt/application'
import { useSharedStore, useStore } from '@src/store'

export const useSignature = () => {
	const { addConfirmWithHWToast } = useSharedStore(state => ({
		addConfirmWithHWToast: state.addConfirmWithHWToastAction,
	}))
	const { account } = useStore(state => ({
		account: state.account,
	}))

	const sign = useCallback(
		async (payload: string | Buffer): Promise<string> => {
			const hashedMessage = sha256(payload)

			addConfirmWithHWToast()

			const signature = await firstValueFrom(account.signHash(hashedMessage))
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
