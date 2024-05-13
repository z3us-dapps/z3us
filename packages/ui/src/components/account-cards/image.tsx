import clsx from 'clsx'
import type { PropsWithChildren } from 'react'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { useNonFungibleData } from 'ui/src/hooks/dapp/use-entity-nft'
import { useHoldsNft } from 'ui/src/hooks/dapp/use-holds-nft'
import { findFieldValue } from 'ui/src/services/metadata'
import type { AccountSkin } from 'ui/src/store/types'

import * as styles from './image.css'

interface IProps {
	address: string
	skin?: AccountSkin
	className?: string
}

export const Image: React.FC<PropsWithChildren<IProps>> = ({ address, skin, className, children }) => {
	const { data } = useNonFungibleData(skin?.collection, skin?.non_fungible_id)
	const holdsNFT = useHoldsNft(address, skin?.collection, skin?.non_fungible_id)

	const dataJson = data?.data?.programmatic_json as any
	const name = findFieldValue('name', dataJson?.fields)
	const imageSrc = findFieldValue('key_image_url', dataJson?.fields)

	if (!skin || holdsNFT === false) return children || null

	return (
		<Box className={clsx(styles.wrapper, className)}>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img src={imageSrc} alt={name} style={skin.styles} />
		</Box>
	)
}
