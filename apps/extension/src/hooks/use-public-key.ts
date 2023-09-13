import type { PublicKey } from '@radixdlt/radix-engine-toolkit'
import { RadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import { useNetworkId } from 'packages/ui/src/hooks/dapp/use-network-id'
import { useSharedStore } from 'packages/ui/src/hooks/use-store'
import { useEffect, useMemo, useState } from 'react'

import { useMessageClient } from './use-message-client'

export const usePublicKey = (): [PublicKey | null, Error | null] => {
	const client = useMessageClient()
	const { keystoreId } = useSharedStore(state => ({
		keystoreId: state.selectedKeystoreId,
	}))

	const [error, setError] = useState<Error | null>(null)
	const [state, setState] = useState<PublicKey | null>(null)

	useEffect(() => {
		const load = async () => {
			try {
				setState(await client.getPublicKey())
				setError(null)
			} catch (err) {
				setState(null)
				setError(err)
			}
		}
		load()
	}, [keystoreId])

	return [state, error]
}

// https://github.com/radixdlt/typescript-radix-engine-toolkit#deriving-virtual-identity-addresses-from-public-keys
export const usePublicKeyIdentityAddresses = (): [string, Error | null] => {
	const networkId = useNetworkId()
	const [publicKey, error] = usePublicKey()

	return useMemo(() => {
		if (error) return ['', error]
		const virtualIdentityAddress = RadixEngineToolkit.Derive.virtualIdentityAddressFromPublicKey(publicKey, networkId)
		return [virtualIdentityAddress.toString(), null]
	}, [publicKey, error])
}

// https://github.com/radixdlt/typescript-radix-engine-toolkit#deriving-babylon-account-addresses-from-olympia-account-addresses
export const useBabylonAccountAddressesFromOlympiaAccountAddress = (olympiaAddress: string): [string, Error | null] => {
	const networkId = useNetworkId()
	const [publicKey, error] = usePublicKey()

	return useMemo(() => {
		if (error) return ['', error]
		const babylonAddress = RadixEngineToolkit.Derive.virtualAccountAddressFromOlympiaAccountAddress(
			olympiaAddress,
			networkId,
		)
		return [babylonAddress.toString(), null]
	}, [publicKey, error])
}
