import React from 'react'

import { Box } from 'ui/src/components/box'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'

export const getDataValue = (field?: any) =>
	field?.value !== undefined ? field?.value : field?.fields?.map(getDataValue).join(', ') || ''

interface IProps {
	field?: any
}

const FieldValue: React.FC<IProps> = ({ field }) => {
	const value = getDataValue(field)
	return (
		<ToolTip message={value}>
			<Box maxWidth="full">
				<Text size="xsmall" truncate>
					{value}
				</Text>
			</Box>
		</ToolTip>
	)
}

export default FieldValue
