import React, { forwardRef } from 'react'

import { type IImageIconOptionalProps, ImageIcon } from 'ui/src/components/image-icon'
import { ToolTip } from 'ui/src/components/tool-tip'
import { useEntityMetadata } from 'ui/src/hooks/dapp/use-entity-metadata'
import { useImages } from 'ui/src/hooks/use-images'
import { getStringMetadata } from 'ui/src/services/metadata'
import { getStrPrefix } from 'ui/src/utils/get-str-prefix'
import { getShortAddress } from 'ui/src/utils/string-utils'

interface IProps extends IImageIconOptionalProps {
	address: string
	toolTipEnabled?: boolean
}

export const ResourceImageIcon = forwardRef<HTMLElement, IProps>(
	({ address, toolTipEnabled = false, ...props }, ref: React.Ref<HTMLElement | null>) => {
		const { data } = useEntityMetadata(address)
		const images = useImages()
		const shortAddress = getShortAddress(address)
		const localImageUrl = images.get(address)

		const name = getStringMetadata('name', data)
		const symbol = getStringMetadata('symbol', data) || ''
		const imageUrl = getStringMetadata('icon_url', data) || ''
		const imageSrc = localImageUrl || imageUrl

		return (
			<ToolTip side="top" message={`${(symbol || '').toUpperCase()}`} disabled={!toolTipEnabled}>
				<span>
					<ImageIcon
						imgSrc={imageSrc}
						imgAlt={name || shortAddress}
						fallbackText={getStrPrefix(symbol || name || shortAddress, 3)}
						{...props}
						ref={ref}
					/>
				</span>
			</ToolTip>
		)
	},
)
