import React, { forwardRef } from 'react'

import { getStrPrefix } from 'ui/src/utils/get-str-prefix'
import { getShortAddress } from 'ui/src/utils/string-utils'

import { useEntityMetadata } from '../../hooks/dapp/use-metadata'
import { type IImageIconOptionalProps, ImageIcon } from '../image-icon'

interface IResourceImageIcon extends IImageIconOptionalProps {
	address: string
}

export const ResourceImageIcon = forwardRef<HTMLElement, IResourceImageIcon>(
	({ address, ...props }, ref: React.Ref<HTMLElement | null>) => {
		const { data } = useEntityMetadata(address)
		const shortAddress = getShortAddress(address)

		const name = data?.find(detail => detail.key === 'name')?.value.as_string
		const symbol = data?.find(detail => detail.key === 'symbol')?.value.as_string
		const imageUrl = data?.find(detail => detail.key === 'image_url')?.value.as_string

		return (
			<ImageIcon
				imgSrc={imageUrl}
				imgAlt={name || shortAddress}
				fallbackText={getStrPrefix(symbol || name || shortAddress)}
				{...props}
				ref={ref}
			/>
		)
	},
)
