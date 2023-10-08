import type { PropsWithChildren } from 'react'
import React, { useEffect, useState } from 'react'

import { useKnownAddresses } from '../hooks/dapp/use-known-addresses'
import { useNetworkId } from '../hooks/dapp/use-network-id'
import type { State } from './images'
import { ImageContext, defaultState } from './images'

export const ImageProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const networkId = useNetworkId()
	const { data: knownAddresses } = useKnownAddresses()

	const [images, setImages] = useState<State>(defaultState)

	useEffect(() => {
		if (knownAddresses) {
			setImages(new Map([[knownAddresses.resourceAddresses.xrd, '/images/token-images/radix-Icon-400x400.png']]))
		}
	}, [networkId, knownAddresses])

	return <ImageContext.Provider value={images}>{children}</ImageContext.Provider>
}
