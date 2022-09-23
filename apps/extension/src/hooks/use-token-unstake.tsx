import { useAccountStore } from '@src/hooks/use-store'
import { useTransaction } from '@src/hooks/use-transaction'
import { ResourceIdentifier, AccountAddress, ValidatorAddress, IntendedUnstakeTokens } from '@radixdlt/application'
import { buildAmount } from '@src/utils/radix'

export const useTokenUnstake = () => {
	const { buildTransactionFromActions } = useTransaction()
	const { account } = useAccountStore(state => ({
		account: state.account,
	}))

	const unstake = async (rri: string, validator: string, amount: string) => {
		const rriResult = ResourceIdentifier.fromUnsafe(rri)
		if (rriResult.isErr()) {
			throw rriResult.error
		}
		const toResult = AccountAddress.fromUnsafe(account.address)
		if (toResult.isErr()) {
			throw toResult.error
		}
		const validatorResult = ValidatorAddress.fromUnsafe(validator)
		if (validatorResult.isErr()) {
			throw validatorResult.error
		}
		const actionResult = IntendedUnstakeTokens.create(
			{
				from_validator: validatorResult.value,
				amount: buildAmount(amount),
				tokenIdentifier: rriResult.value,
			},
			toResult.value,
		)
		if (actionResult.isErr()) {
			throw actionResult.error
		}
		return buildTransactionFromActions([actionResult.value])
	}

	return unstake
}
