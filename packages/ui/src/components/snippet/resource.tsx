import React from 'react'
import { useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { ToolTip } from 'ui/src/components/tool-tip'
import { RedGreenText, Text } from 'ui/src/components/typography'
import { DECIMAL_STYLES } from 'ui/src/constants/number'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { findMetadataValue } from 'ui/src/services/metadata'
import { getShortAddress } from 'ui/src/utils/string'

import type { TImageSizes } from '../image-icon'

const LSU = 'LSU'

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
	const validator = findMetadataValue('validator', data?.metadata?.items)
	let symbol = findMetadataValue('symbol', data?.metadata?.items)

	if (data?.details.type === 'FungibleResource' && validator && !symbol) {
		symbol = LSU
	}

	const displayName = symbol?.toUpperCase() || name || getShortAddress(address)

	if (isLoading) return <FallbackLoading />

	return (
		<Box display="flex" flexDirection={reversed ? 'row-reverse' : 'row'} gap="small" alignItems="center">
			<ResourceImageIcon address={address} size={size} />
			<Box display="flex" flexDirection="column" flexShrink={0}>
				{displayName && (
					<Text align={reversed ? 'right' : 'left'} color="strong" weight="medium" size="xsmall" truncate>
						{displayName}
					</Text>
				)}
				{change && (
					<ToolTip message={change}>
						<Box>
							<RedGreenText align={reversed ? 'right' : 'left'} color="strong" size="xsmall" truncate change={change}>
								{intl.formatNumber(change, { signDisplay: 'exceptZero', ...DECIMAL_STYLES })}
							</RedGreenText>
						</Box>
					</ToolTip>
				)}
			</Box>
		</Box>
	)
}
