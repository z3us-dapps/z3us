import type { EntityMetadataItem } from '@radixdlt/babylon-gateway-api-sdk'
import React from 'react'

import { Link } from 'ui/src/components/typography'

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

	return isLinkValue ? (
		<Link size="small" target="_blank" href={metaValue}>
			{metaValue}
		</Link>
	) : (
		metaValue
	)
}

export default MetadataValue
