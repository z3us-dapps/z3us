import React, { forwardRef, useMemo } from 'react'

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

		const { tooltip, ...computedProps } = useMemo(() => {
			const shortAddress = getShortAddress(address)
			const name = findMetadataValue('name', data?.metadata?.items)
			const symbol = findMetadataValue('symbol', data?.metadata?.items)
			const imageUrl = findMetadataValue('icon_url', data?.metadata?.items)

			const isNFT = data?.details?.type === 'NonFungibleResource'

			let imgSrc = images.get(address)
			imgSrc = !imgSrc && imageUrl ? `https://ociswap.com/cdn-cgi/image/width=auto,format=auto/${imageUrl}` : imgSrc
			imgSrc = !imgSrc && isNFT ? defaultNftImage : imgSrc

			return {
				tooltip: (symbol || '').toUpperCase() || name,
				rounded: !isNFT,
				imgSrc,
				imgAlt: name || shortAddress,
				fallbackText: getStrPrefix(symbol || name || shortAddress, 3),
			}
		}, [data, images])

		return (
			<ToolTip side="top" message={tooltip} disabled={!toolTipEnabled || !tooltip}>
				<span>
					<ImageIcon size={size} ref={ref} {...props} {...computedProps} />
				</span>
			</ToolTip>
		)
	},
)
