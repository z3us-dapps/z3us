import React, { forwardRef } from 'react'

import { getStrPrefix } from 'ui/src/utils/get-str-prefix'
import { getShortAddress } from 'ui/src/utils/string-utils'

import { useEntityMetadata, useMetadataValue } from '../../hooks/dapp/use-entity-metadata'
import { type IImageIconOptionalProps, ImageIcon } from '../image-icon'

interface IResourceImageIcon extends IImageIconOptionalProps {
	address: string
}

export const ResourceImageIcon = forwardRef<HTMLElement, IResourceImageIcon>(
	({ address, ...props }, ref: React.Ref<HTMLElement | null>) => {
		const { data } = useEntityMetadata(address)
		const shortAddress = getShortAddress(address)

		const name = useMetadataValue('name', data)
		const symbol = useMetadataValue('symbol', data) || ''
		const imageUrl = useMetadataValue('icon_url', data) || ''

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
