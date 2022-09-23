import { useAccountStore } from '@src/hooks/use-store'
import { useMessage } from '@src/hooks/use-message'
import { useTransaction } from '@src/hooks/use-transaction'
import { ResourceIdentifier, AccountAddress, IntendedTransferTokens } from '@radixdlt/application'
import { buildAmount } from '@src/utils/radix'

export const useTransferTokens = () => {
	const { buildTransactionFromActions } = useTransaction()
	const { createMessage } = useMessage()
	const { account } = useAccountStore(state => ({
		account: state.account,
	}))

	const transfer = async (rri: string, to: string, amount: string, text?: string, encryptMessage = false) => {
		const rriResult = ResourceIdentifier.fromUnsafe(rri)
		if (rriResult.isErr()) {
			throw rriResult.error
		}
		const toResult = AccountAddress.fromUnsafe(to)
		if (toResult.isErr()) {
			throw toResult.error
		}
		const actionResult = IntendedTransferTokens.create(
			{
				to_account: toResult.value,
				amount: buildAmount(amount),
				tokenIdentifier: rriResult.value,
			},
			account.address,
		)
		if (actionResult.isErr()) {
			throw actionResult.error
		}

		let message: string
		if (text) {
			if (encryptMessage) {
				message = await createMessage(text, to)
			} else {
				message = await createMessage(text)
			}
			return buildTransactionFromActions([actionResult.value], message)
		}
		return buildTransactionFromActions([actionResult.value], message)
	}

	return transfer
}
