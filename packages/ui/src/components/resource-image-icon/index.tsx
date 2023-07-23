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

		const name = data?.find(detail => detail.key === 'name')?.value.raw_hex
		const symbol = data?.find(detail => detail.key === 'symbol')?.value.raw_hex
		const imageUrl = data?.find(detail => detail.key === 'icon_url')?.value.raw_hex

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
