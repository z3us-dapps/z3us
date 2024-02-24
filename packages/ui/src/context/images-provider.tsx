import type { PropsWithChildren } from 'react'
import React, { useEffect, useState } from 'react'

import { useKnownAddresses } from 'ui/src/hooks/dapp/use-known-addresses'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network'

import type { TImages } from './images'
import { ImageContext } from './images'

export const brandImages = {
	RADIX: 'radix',
	OCI_SWAP: 'oci_swap',
	ASTROLESCENT: 'astrolescent',
}

const brandImagesMap = new Map([
	[brandImages.RADIX, '/images/token-images/xrd-token-icon.svg'],
	[brandImages.OCI_SWAP, '/images/token-images/oci.png'],
	[brandImages.ASTROLESCENT, '/images/token-images/astrolescent.png'],
])

export const ImageProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const networkId = useNetworkId()
	const { data: knownAddresses } = useKnownAddresses()

	const [images, setImages] = useState<TImages>(new Map())

	const value = React.useMemo(() => ({ images, setImages }), [images, setImages])

	useEffect(() => {
		if (knownAddresses) {
			const knownImagesMap = new Map([
				[knownAddresses.resourceAddresses.xrd, '/images/token-images/xrd-token-icon.svg'],
			])
			const combinedMap = new Map([...brandImagesMap, ...knownImagesMap])

			setImages(combinedMap)
		} else {
			setImages(brandImagesMap)
		}
	}, [networkId, knownAddresses])

	// return <ImageContext.Provider value={{ images, updateImages }}>{children}</ImageContext.Provider>
	return <ImageContext.Provider value={value}>{children}</ImageContext.Provider>
}
