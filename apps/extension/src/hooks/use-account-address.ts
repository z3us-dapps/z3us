import { LTSRadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import { useNetworkId } from 'packages/ui/src/hooks/dapp/use-network-id'
import { useMemo } from 'react'

import { usePublicKey } from './use-public-key'

export const useVirtualAccountAddress = () => {
	const networkId = useNetworkId()
	const [publicKey] = usePublicKey()

	return useMemo(async () => {
		if (!publicKey) {
			return null
		}
		const virtualIdentityAddress: string = await LTSRadixEngineToolkit.Derive.virtualAccountAddress(
			publicKey,
			networkId,
		)

		return virtualIdentityAddress
	}, [publicKey])
}

export const useAccountAddressFromOlympiaAccountAddress = (olympiaAccountAddress: string) => {
	const networkId = useNetworkId()

	return useMemo(async () => {
		const { babylonAccountAddress } = await LTSRadixEngineToolkit.Derive.babylonAccountAddressFromOlympiaAccountAddress(
			olympiaAccountAddress,
			networkId,
		)

		return babylonAccountAddress
	}, [olympiaAccountAddress])
}
