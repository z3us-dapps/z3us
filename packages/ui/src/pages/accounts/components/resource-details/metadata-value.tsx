import { EntityMetadataItem } from '@radixdlt/babylon-gateway-api-sdk'
import React from 'react'

export const getMetadataValue = (value?: EntityMetadataItem) => {
	const typed: any = value?.value?.typed

	return typed?.value ? typed?.value || '' : typed?.values.join(', ')
}

interface IProps {
	value?: EntityMetadataItem
}

const MetadataValue: React.FC<IProps> = ({ value }) => {
	return <>{getMetadataValue(value)}</>
}

export default MetadataValue
