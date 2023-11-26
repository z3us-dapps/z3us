import React from 'react'
import { useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { ToolTip } from 'ui/src/components/tool-tip'
import { RedGreenText, Text } from 'ui/src/components/typography'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { findMetadataValue } from 'ui/src/services/metadata'

import { getShortAddress } from '../../utils/string-utils'
import type { TImageSizes } from '../image-icon'

interface IProps {
	address: string
	change?: number
	reversed?: boolean
	size?: TImageSizes
}

export const ResourceSnippet: React.FC<IProps> = ({ address, change, reversed, size = 'xlarge' }) => {
	const intl = useIntl()
	const { data, isLoading } = useEntityDetails(address)

	const name = findMetadataValue('name', data?.metadata?.items)
	const symbol = findMetadataValue('symbol', data?.metadata?.items)

	const displayName = symbol?.toUpperCase() || name || getShortAddress(address)
	const c = change
		? intl.formatNumber(change, {
				style: 'decimal',
				maximumFractionDigits: 18,
				signDisplay: 'always',
		  })
		: ''

	if (isLoading) return <FallbackLoading />

	return (
		<Box display="flex" flexDirection={reversed ? 'row-reverse' : 'row'} gap="medium" alignItems="center">
			<ResourceImageIcon address={address} size={size} />
			<Box display="flex" flexDirection="column" flexShrink={0}>
				{displayName && (
					<Text align={reversed ? 'right' : 'left'} color="strong" weight="medium" size="xsmall" truncate>
						{displayName}
					</Text>
				)}
				{change && (
					<ToolTip message={c}>
						<Box>
							<RedGreenText align={reversed ? 'right' : 'left'} color="strong" size="xsmall" truncate change={change}>
								{c}
							</RedGreenText>
						</Box>
					</ToolTip>
				)}
			</Box>
		</Box>
	)
}
