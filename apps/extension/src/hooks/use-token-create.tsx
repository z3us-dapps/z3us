import { useAccountStore } from '@src/hooks/use-store'
import { useTransaction } from '@src/hooks/use-transaction'
import { buildAmount } from '@src/utils/radix'
import { ExtendedActionType, NewTokenDefinition } from '@src/types'
import { parseAccountAddress, parseResourceIdentifier } from '@src/services/radix/serializer'

export const useTokenCreate = () => {
	const { buildTransactionFromActions } = useTransaction()
	const { address } = useAccountStore(state => ({
		address: state.getCurrentAddressAction(),
	}))

	const create = async (rri: string, amount: string, token: NewTokenDefinition) =>
		buildTransactionFromActions([
			{
				type: ExtendedActionType.CREATE_TOKEN,
				to_account: parseAccountAddress(address),
				amount: buildAmount(token.is_supply_mutable ? '0' : amount),
				rri: parseResourceIdentifier(rri),
				token,
			},
		])

	return create
}
