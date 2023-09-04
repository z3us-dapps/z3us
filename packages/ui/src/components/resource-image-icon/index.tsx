import React, { forwardRef } from 'react'

import { ToolTip } from 'ui/src/components/tool-tip'
import { getStringMetadata } from 'ui/src/services/metadata'
import { getStrPrefix } from 'ui/src/utils/get-str-prefix'
import { getShortAddress } from 'ui/src/utils/string-utils'

import { useEntityMetadata } from '../../hooks/dapp/use-entity-metadata'
import { type IImageIconOptionalProps, ImageIcon } from '../image-icon'
import { resourceImageMap } from './resource-image-map'

interface IResourceImageIcon extends IImageIconOptionalProps {
	address: string
	toolTipEnabled?: boolean
}

export const ResourceImageIcon = forwardRef<HTMLElement, IResourceImageIcon>(
	({ address, toolTipEnabled = false, ...props }, ref: React.Ref<HTMLElement | null>) => {
		const { data } = useEntityMetadata(address)
		const shortAddress = getShortAddress(address)
		const imageMapLookup = resourceImageMap.get(address)?.imageUrl

		const name = getStringMetadata('name', data)
		const symbol = getStringMetadata('symbol', data) || ''
		const imageUrl = getStringMetadata('icon_url', data) || ''
		const imageSrc = imageMapLookup || imageUrl

		return (
			<ToolTip isTranslated={false} side="top" message={symbol} disabled={!toolTipEnabled}>
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
