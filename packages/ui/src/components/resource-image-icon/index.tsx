import React, { forwardRef } from 'react'

import { useEntityMetadata } from '../../hooks/dapp/use-metadata'
import { getShortAddress } from '../../utils/string-utils'
import { type IImageIconOptionalProps, ImageIcon } from '../image-icon'

interface IResourceImageIcon extends IImageIconOptionalProps {
	address: string
}

export const ResourceImageIcon = forwardRef<HTMLElement, IResourceImageIcon>(
	({ address, ...props }, ref: React.Ref<HTMLElement | null>) => {
		const metadata = useEntityMetadata(address)

		const shortAddress = getShortAddress(address)

		const name = metadata?.data?.find(detail => detail.key === 'name')?.value.as_string
		const symbol = metadata?.data?.find(detail => detail.key === 'symbol')?.value.as_string
		const imageUrl = metadata?.data?.find(detail => detail.key === 'image_url')?.value.as_string

		return (
			<ImageIcon
				imgSrc={imageUrl}
				imgAlt={name || shortAddress}
				fallbackText={symbol || name || shortAddress}
				{...props}
				ref={ref}
			/>
		)
	},
)
