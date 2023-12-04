import React, { forwardRef } from 'react'

import { type IImageIconProps, ImageIcon } from 'ui/src/components/image-icon'
import { ToolTip } from 'ui/src/components/tool-tip'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { useImages } from 'ui/src/hooks/use-images'
import { findMetadataValue } from 'ui/src/services/metadata'
import { getStrPrefix } from 'ui/src/utils/get-str-prefix'
import { getShortAddress } from 'ui/src/utils/string-utils'

export interface IResourceImageIconProps
	extends Omit<IImageIconProps, 'fallbackText' | 'imgAlt' | 'imgSrc' | 'rounded'> {
	address: string
	toolTipEnabled?: boolean
}

const defaultNftImage = '/images/token-images/nft-placeholder.svg'

export const ResourceImageIcon = forwardRef<HTMLElement, IResourceImageIconProps>(
	({ address, toolTipEnabled = false, size, ...props }, ref: React.Ref<HTMLElement | null>) => {
		const { data } = useEntityDetails(address)
		const images = useImages()

		const shortAddress = getShortAddress(address)
		const name = findMetadataValue('name', data?.metadata?.items)
		const symbol = findMetadataValue('symbol', data?.metadata?.items)
		const imageUrl = findMetadataValue('icon_url', data?.metadata?.items)

		const isNFT = data?.details?.type === 'NonFungibleResource'
		const tooltip = (symbol || '').toUpperCase() || name
		let imageSrc = images.get(address)
		imageSrc = !imageSrc && imageUrl ? `https://ociswap.com/cdn-cgi/image/width=auto,format=auto/${imageUrl}` : ''
		imageSrc = !imageSrc && isNFT ? defaultNftImage : ''

		return (
			<ToolTip side="top" message={tooltip} disabled={!toolTipEnabled || !tooltip}>
				<span>
					<ImageIcon
						imgSrc={imageSrc}
						imgAlt={name || shortAddress}
						fallbackText={getStrPrefix(symbol || name || shortAddress, 3)}
						rounded={!isNFT}
						size={size}
						ref={ref}
						{...props}
					/>
				</span>
			</ToolTip>
		)
	},
)
