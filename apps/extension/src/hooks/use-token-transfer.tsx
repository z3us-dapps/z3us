import { IntendedTransferTokens } from '@radixdlt/application'

import { useMessage } from '@src/hooks/use-message'
import { useNoneSharedStore } from '@src/hooks/use-store'
import { useTransaction } from '@src/hooks/use-transaction'
import { parseAccountAddress, parseResourceIdentifier } from '@src/services/radix/serializer'
import { buildAmount } from '@src/utils/radix'

export const useTransferTokens = () => {
	const { buildTransactionFromActions } = useTransaction()
	const { createMessage } = useMessage()
	const { address } = useNoneSharedStore(state => ({
		address: state.getCurrentAddressAction(),
	}))

	const transfer = async (rri: string, to: string, amount: string, text?: string, encryptMessage = false) => {
		const actionResult = IntendedTransferTokens.create(
			{
				to_account: parseAccountAddress(to),
				amount: buildAmount(amount),
				tokenIdentifier: parseResourceIdentifier(rri),
			},
			parseAccountAddress(address),
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
