import { RadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import { useNetworkId } from 'packages/ui/src/hooks/dapp/use-network-id'
import { useMemo } from 'react'

import { usePublicKey } from './use-key-pair'

export const useVirtualAccountAddress = (olympiaAccountAddress: string) => {
	const networkId = useNetworkId()
	const [publicKey] = usePublicKey()

	return useMemo(async () => {
		if (!publicKey) {
			return null
		}
		const virtualIdentityAddress: string = await RadixEngineToolkit.deriveVirtualAccountAddress(publicKey, networkId)

		return virtualIdentityAddress
	}, [olympiaAccountAddress, publicKey])
}

export const useVirtualIdentityAddresses = (olympiaAccountAddress: string) => {
	const networkId = useNetworkId()
	const [publicKey] = usePublicKey()

	return useMemo(async () => {
		if (!publicKey) {
			return null
		}
		const virtualIdentityAddress: string = await RadixEngineToolkit.deriveVirtualIdentityAddress(publicKey, networkId)

		return virtualIdentityAddress
	}, [olympiaAccountAddress, publicKey])
}

export const useIdentityFromOlympiaAccountAddress = (olympiaAccountAddress: string) => {
	const networkId = useNetworkId()

	return useMemo(async () => {
		const { babylonAccountAddress } = await RadixEngineToolkit.deriveBabylonAddressFromOlympiaAddress(
			olympiaAccountAddress,
			networkId,
		)

		return babylonAccountAddress
	}, [olympiaAccountAddress])
}
