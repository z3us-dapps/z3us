import { IntendedUnstakeTokens } from '@radixdlt/application'

import { useNoneSharedStore } from '@src/hooks/use-store'
import { useTransaction } from '@src/hooks/use-transaction'
import { parseAccountAddress, parseResourceIdentifier, parseValidatorAddress } from '@src/services/radix/serializer'
import { buildAmount } from '@src/utils/radix'

export const useTokenUnstake = () => {
	const { buildTransactionFromActions } = useTransaction()
	const { address } = useNoneSharedStore(state => ({
		address: state.getCurrentAddressAction(),
	}))

	const unstake = async (rri: string, validator: string, amount: string) => {
		const actionResult = IntendedUnstakeTokens.create(
			{
				from_validator: parseValidatorAddress(validator),
				amount: buildAmount(amount),
				tokenIdentifier: parseResourceIdentifier(rri),
			},
			parseAccountAddress(address),
		)
		if (actionResult.isErr()) {
			throw actionResult.error
		}
		return buildTransactionFromActions([actionResult.value])
	}

	return unstake
}
