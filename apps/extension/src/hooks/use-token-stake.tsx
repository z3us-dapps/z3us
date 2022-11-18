import { useNoneSharedStore } from '@src/hooks/use-store'
import { useTransaction } from '@src/hooks/use-transaction'
import { IntendedStakeTokens } from '@radixdlt/application'
import { buildAmount } from '@src/utils/radix'
import { parseAccountAddress, parseResourceIdentifier, parseValidatorAddress } from '@src/services/radix/serializer'

export const useTokenStake = () => {
	const { buildTransactionFromActions } = useTransaction()
	const { address } = useNoneSharedStore(state => ({
		address: state.getCurrentAddressAction(),
	}))

	const stake = async (rri: string, validator: string, amount: string) => {
		const actionResult = IntendedStakeTokens.create(
			{
				to_validator: parseValidatorAddress(validator),
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

	return stake
}
