import React from 'react'

import { Box } from 'ui/src/components/box'
import { Text } from 'ui/src/components/typography'

interface IAssetStatisticCellProps {
	value?: any
	row?: any
}

export const AssetStatisticCell: React.FC<IAssetStatisticCellProps> = props => {
	const {
		value,
		row: { original },
	} = props

	const { id } = original

	return (
		<Box key={id} display="flex">
			<Text size="small" color="strong" truncate>
				{value}
			</Text>
		</Box>
	)
}
