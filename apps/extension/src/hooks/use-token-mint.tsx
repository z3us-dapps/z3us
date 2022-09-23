import { useAccountStore } from '@src/hooks/use-store'
import { useTransaction } from '@src/hooks/use-transaction'
import { ResourceIdentifier } from '@radixdlt/application'
import { buildAmount } from '@src/utils/radix'
import { ExtendedActionType } from '@src/types'

export const useTokenMint = () => {
	const { buildTransactionFromActions } = useTransaction()
	const { account } = useAccountStore(state => ({
		account: state.account,
	}))

	const mint = async (rri: string, amount: string) => {
		const rriResult = ResourceIdentifier.fromUnsafe(rri)
		if (rriResult.isErr()) {
			throw rriResult.error
		}
		return buildTransactionFromActions([
			{
				type: ExtendedActionType.MINT_TOKENS,
				to_account: account.address,
				amount: buildAmount(amount),
				rri: rriResult.value,
			},
		])
	}

	return mint
}
