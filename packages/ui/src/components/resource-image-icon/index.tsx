import React, { forwardRef } from 'react'

import { type IImageIconProps, ImageIcon } from 'ui/src/components/image-icon'
import { ToolTip } from 'ui/src/components/tool-tip'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { useImages } from 'ui/src/hooks/use-images'
import { findMetadataValue } from 'ui/src/services/metadata'
import { getStrPrefix } from 'ui/src/utils/get-str-prefix'
import { getShortAddress } from 'ui/src/utils/string-utils'

interface IProps extends Omit<IImageIconProps, 'fallbackText' | 'imgAlt' | 'imgSrc' | 'rounded'> {
	address: string
	toolTipEnabled?: boolean
}

export const ResourceImageIcon = forwardRef<HTMLElement, IProps>(
	({ address, toolTipEnabled = false, size, ...props }, ref: React.Ref<HTMLElement | null>) => {
		const { data } = useEntityDetails(address)
		const images = useImages()
		const shortAddress = getShortAddress(address)
		const localImageUrl = images.get(address)

		const name = findMetadataValue('name', data?.metadata?.items)
		const symbol = findMetadataValue('symbol', data?.metadata?.items)
		const imageUrl = findMetadataValue('icon_url', data?.metadata?.items)
		const imageSrc =
			localImageUrl || (imageUrl ? `https://ociswap.com/cdn-cgi/image/width=auto,format=auto/${imageUrl}` : '')
		const tooltip = (symbol || '').toUpperCase() || name

		return (
			<ToolTip side="top" message={tooltip} disabled={!toolTipEnabled || !tooltip}>
				<span>
					<ImageIcon
						imgSrc={imageSrc}
						imgAlt={name || shortAddress}
						fallbackText={getStrPrefix(symbol || name || shortAddress, 3)}
						rounded={data?.details?.type !== 'NonFungibleResource'}
						size={size}
						{...props}
						ref={ref}
					/>
				</span>
			</ToolTip>
		)
	},
)
