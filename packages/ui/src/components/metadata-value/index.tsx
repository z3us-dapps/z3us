import type { EntityMetadataItem } from '@radixdlt/babylon-gateway-api-sdk'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Link, Text } from 'ui/src/components/typography'
import { getMetadataValue } from 'ui/src/services/metadata'

import * as styles from './styles.css'

const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/

interface IProps {
	value?: EntityMetadataItem
}

const MetadataValue: React.FC<IProps> = ({ value }) => {
	const metaValue = getMetadataValue(value)
	const isLinkValue = urlRegex.test(metaValue)

	return (
		<ToolTip message={metaValue}>
			<Box maxWidth="full">
				{isLinkValue ? (
					<Link target="_blank" href={metaValue} className={styles.metaDataLinkWrapper}>
						<Text size="xsmall" truncate>
							{metaValue}
						</Text>
					</Link>
				) : (
					<Text size="xsmall" truncate>
						{metaValue}
					</Text>
				)}
			</Box>
		</ToolTip>
	)
}

export default MetadataValue
