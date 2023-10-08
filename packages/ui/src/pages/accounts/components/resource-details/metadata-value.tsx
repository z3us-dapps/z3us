import type { EntityMetadataItem } from '@radixdlt/babylon-gateway-api-sdk'
import { Box } from 'packages/ui/src/components/box'
import React from 'react'

import { Link, Text } from 'ui/src/components/typography'

import * as styles from './styles.css'

const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/

export const getMetadataValue = (value?: EntityMetadataItem) => {
	const typed: any = value?.value?.typed

	return typed?.value ? typed?.value || '' : typed?.values.join(', ')
}

interface IProps {
	value?: EntityMetadataItem
}

const MetadataValue: React.FC<IProps> = ({ value }) => {
	const metaValue = getMetadataValue(value)
	const isLinkValue = urlRegex.test(metaValue)

	return (
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
	)
}

export default MetadataValue
