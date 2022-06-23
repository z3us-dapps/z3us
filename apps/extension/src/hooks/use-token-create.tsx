import { useStore } from '@src/store'
import { useTransaction } from '@src/hooks/use-transaction'
import { ResourceIdentifier } from '@radixdlt/application'
import { buildAmount } from '@src/utils/radix'
import { ExtendedActionType, NewTokenDefinition } from '@src/types'

export const useTokenCreate = () => {
	const { buildTransactionFromActions } = useTransaction()
	const { account } = useStore(state => ({
		account: state.account,
	}))

	const create = async (rri: string, amount: string, token: NewTokenDefinition) => {
		const rriResult = ResourceIdentifier.fromUnsafe(rri)
		if (rriResult.isErr()) {
			throw rriResult.error
		}
		return buildTransactionFromActions([
			{
				type: ExtendedActionType.CREATE_TOKEN,
				to_account: account.address,
				amount: buildAmount(token.is_supply_mutable ? '0' : amount),
				rri: rriResult.value,
				token,
			},
		])
	}

	return create
}
