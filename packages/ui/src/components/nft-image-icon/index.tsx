import React, { forwardRef } from 'react'

import { type IImageIconProps, ImageIcon } from 'ui/src/components/image-icon'
import { ToolTip } from 'ui/src/components/tool-tip'
import { useNonFungibleData } from 'ui/src/hooks/dapp/use-entity-nft'
import { findFieldValue } from 'ui/src/services/metadata'

interface IProps extends Omit<IImageIconProps, 'fallbackText' | 'imgAlt' | 'imgSrc' | 'rounded'> {
	address: string
	id: string
	toolTipEnabled?: boolean
	width?: string
}

export const NftImageIcon = forwardRef<HTMLElement, IProps>(
	({ id, address, toolTipEnabled = false, width = 'auto', ...props }, ref: React.Ref<HTMLElement | null>) => {
		const { data } = useNonFungibleData(address, id)

		const dataJson = data?.data?.programmatic_json as any
		const name = findFieldValue('name', dataJson?.fields) || id
		const imageSrc = findFieldValue('key_image_url', dataJson?.fields)

		return (
			<ToolTip side="top" message={name} disabled={!toolTipEnabled}>
				<span>
					<ImageIcon
						{...props}
						imgSrc={imageSrc ? `https://ociswap.com/cdn-cgi/image/width=${width},format=auto/${encodeURIComponent(imageSrc)}` : ''}
						imgAlt={name}
						rounded={false}
						ref={ref}
					/>
				</span>
			</ToolTip>
		)
	},
)
