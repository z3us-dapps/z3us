import { RadixNetworkConfigById } from '@radixdlt/radix-dapp-toolkit'
import RnsSDK from '@radixnameservice/rns-sdk'
import React, { type PropsWithChildren, useMemo } from 'react'

import { useNetworkId } from 'ui/src/hooks/dapp/use-network'

import { RnsContext } from './rns'

export const RnsProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const networkId = useNetworkId()
	const rns = useMemo(
		() =>
			new RnsSDK({
				network: RadixNetworkConfigById[networkId].networkName.toLocaleLowerCase() as any,
			}),
		[networkId],
	)

	return <RnsContext.Provider value={rns}>{children}</RnsContext.Provider>
}
