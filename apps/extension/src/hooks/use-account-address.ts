import { LTSRadixEngineToolkit, OlympiaNetwork, RadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import { useNetworkId } from 'packages/ui/src/hooks/dapp/use-network-id'
import { useMemo } from 'react'

import { usePublicKey } from './use-public-key'

// https://github.com/radixdlt/typescript-radix-engine-toolkit#deriving-virtual-identity-addresses-from-public-keys
export const usePersonaAddress = (index: number = 0): [string, Error | null] => {
	const networkId = useNetworkId()
	const [publicKey, error] = usePublicKey(index)

	return useMemo(() => {
		if (error) return ['', error]
		const virtualIdentityAddress = RadixEngineToolkit.Derive.virtualIdentityAddressFromPublicKey(publicKey, networkId)
		return [virtualIdentityAddress.toString(), null]
	}, [publicKey, error])
}

export const useAccountAddress = (index: number = 0) => {
	const networkId = useNetworkId()
	const [publicKey] = usePublicKey(index)

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

export const useOlympiaAccountAddress = (
	index: number = 0,
	olympiaNetwork: OlympiaNetwork = OlympiaNetwork.Mainnet,
): [string, Error | null] => {
	const [publicKey, error] = usePublicKey(index)

	return useMemo(() => {
		if (error) return ['', error]
		const babylonAddress = RadixEngineToolkit.Derive.olympiaAccountAddressFromPublicKey(
			publicKey.publicKey,
			olympiaNetwork,
		)
		return [babylonAddress.toString(), null]
	}, [publicKey, error])
}

// https://github.com/radixdlt/typescript-radix-engine-toolkit#deriving-babylon-account-addresses-from-olympia-account-addresses
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
