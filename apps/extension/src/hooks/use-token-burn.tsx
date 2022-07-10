import { useStore } from '@src/store'
import { useTransaction } from '@src/hooks/use-transaction'
import { ResourceIdentifier } from '@radixdlt/application'
import { buildAmount } from '@src/utils/radix'
import { ExtendedActionType } from '@src/types'

export const useTokenBurn = () => {
	const { buildTransactionFromActions } = useTransaction()
	const { account } = useStore(state => ({
		account: state.account,
	}))

	const burn = async (rri: string, amount: string) => {
		const rriResult = ResourceIdentifier.fromUnsafe(rri)
		if (rriResult.isErr()) {
			throw rriResult.error
		}
		return buildTransactionFromActions([
			{
				type: ExtendedActionType.BURN_TOKENS,
				from_account: account.address,
				amount: buildAmount(amount),
				rri: rriResult.value,
			},
		])
	}

	return burn
}
