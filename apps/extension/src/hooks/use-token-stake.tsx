import { useAccountStore } from '@src/hooks/use-store'
import { useTransaction } from '@src/hooks/use-transaction'
import { ResourceIdentifier, AccountAddress, ValidatorAddress, IntendedStakeTokens } from '@radixdlt/application'
import { buildAmount } from '@src/utils/radix'

export const useTokenStake = () => {
	const { buildTransactionFromActions } = useTransaction()
	const { account } = useAccountStore(state => ({
		account: state.account,
	}))

	const stake = async (rri: string, validator: string, amount: string) => {
		const rriResult = ResourceIdentifier.fromUnsafe(rri)
		if (rriResult.isErr()) {
			throw rriResult.error
		}
		const fromResult = AccountAddress.fromUnsafe(account.address)
		if (fromResult.isErr()) {
			throw fromResult.error
		}
		const validatorResult = ValidatorAddress.fromUnsafe(validator)
		if (validatorResult.isErr()) {
			throw validatorResult.error
		}
		const actionResult = IntendedStakeTokens.create(
			{
				to_validator: validatorResult.value,
				amount: buildAmount(amount),
				tokenIdentifier: rriResult.value,
			},
			fromResult.value,
		)
		if (actionResult.isErr()) {
			throw actionResult.error
		}
		return buildTransactionFromActions([actionResult.value])
	}

	return stake
}
