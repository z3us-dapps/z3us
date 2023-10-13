import React, { forwardRef } from 'react'

import { type IImageIconProps, ImageIcon } from 'ui/src/components/image-icon'
import { ToolTip } from 'ui/src/components/tool-tip'
import { useNonFungibleData } from 'ui/src/hooks/dapp/use-entity-nft'
import { getStringNftData } from 'ui/src/services/metadata'

interface IProps extends Omit<IImageIconProps, 'fallbackText' | 'imgAlt' | 'imgSrc'> {
	address: string
	id: string
	toolTipEnabled?: boolean
}

export const NftImageIcon = forwardRef<HTMLElement, IProps>(
	({ id, address, toolTipEnabled = false, ...props }, ref: React.Ref<HTMLElement | null>) => {
		const { data } = useNonFungibleData(address, id)

		const dataJson = data?.data.programmatic_json as any
		const name = getStringNftData('name', dataJson?.fields) || id
		const imageSrc = getStringNftData('key_image_url', dataJson?.fields) || ''

		return (
			<ToolTip side="top" message={name} disabled={!toolTipEnabled}>
				<span>
					<ImageIcon imgSrc={imageSrc} imgAlt={name} fallbackText={id} {...props} ref={ref} />
				</span>
			</ToolTip>
		)
	},
)
