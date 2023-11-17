import React, { forwardRef } from 'react'

import { type IImageIconProps, ImageIcon } from 'ui/src/components/image-icon'
import { ToolTip } from 'ui/src/components/tool-tip'
import { useNonFungibleData } from 'ui/src/hooks/dapp/use-entity-nft'
import { findFieldValue } from 'ui/src/services/metadata'
import { getShortAddress } from 'ui/src/utils/string-utils'

interface IProps extends Omit<IImageIconProps, 'fallbackText' | 'imgAlt' | 'imgSrc' | 'rounded'> {
	address: string
	id: string
	toolTipEnabled?: boolean
}

export const NftImageIcon = forwardRef<HTMLElement, IProps>(
	({ id, address, toolTipEnabled = false, size, ...props }, ref: React.Ref<HTMLElement | null>) => {
		const { data } = useNonFungibleData(address, id)

		const dataJson = data?.data.programmatic_json as any
		const name = findFieldValue('name', dataJson?.fields) || id
		const imageSrc = findFieldValue('key_image_url', dataJson?.fields)

		return (
			<ToolTip side="top" message={name} disabled={!toolTipEnabled}>
				<span>
					<ImageIcon
						imgSrc={imageSrc ? `https://ociswap.com/cdn-cgi/image/width=auto,format=auto/${imageSrc}` : ''}
						imgAlt={name}
						fallbackText={getShortAddress(id, 2)}
						rounded={false}
						size={size}
						{...props}
						ref={ref}
					/>
				</span>
			</ToolTip>
		)
	},
)
