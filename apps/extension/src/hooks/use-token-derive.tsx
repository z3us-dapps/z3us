import { AccountAddress } from '@radixdlt/application'

import { useRadix } from '@src/hooks/use-radix'

export const useTokenDerive = () => {
	const radix = useRadix()

	const derive = async (owner: string, symbol: string) => {
		const ownerResult = AccountAddress.fromUnsafe(owner)
		if (ownerResult.isErr()) {
			throw ownerResult.error
		}

		const address = ownerResult.value

		return radix.tokenDerive(address.network, symbol, address.publicKey.toString())
	}

	return derive
}
