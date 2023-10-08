import React, { forwardRef } from 'react'

import { type IImageIconOptionalProps, ImageIcon } from 'ui/src/components/image-icon'
import { ToolTip } from 'ui/src/components/tool-tip'
import { useEntityMetadata } from 'ui/src/hooks/dapp/use-entity-metadata'
import { getStringMetadata } from 'ui/src/services/metadata'
import { getStrPrefix } from 'ui/src/utils/get-str-prefix'
import { getShortAddress } from 'ui/src/utils/string-utils'

import { resourceImageMap } from './resource-image-map'

interface IProps extends IImageIconOptionalProps {
	address: string
	toolTipEnabled?: boolean
}

export const ResourceImageIcon = forwardRef<HTMLElement, IProps>(
	({ address, toolTipEnabled = false, ...props }, ref: React.Ref<HTMLElement | null>) => {
		const { data } = useEntityMetadata(address)
		const shortAddress = getShortAddress(address)
		const imageMapLookup = resourceImageMap.get(address)?.imageUrl

		const name = getStringMetadata('name', data)
		const symbol = getStringMetadata('symbol', data) || ''
		const imageUrl = getStringMetadata('icon_url', data) || ''
		const imageSrc = imageMapLookup || imageUrl

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
