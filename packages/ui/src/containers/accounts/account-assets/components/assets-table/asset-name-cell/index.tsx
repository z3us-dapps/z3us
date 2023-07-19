import React from 'react'

import { Box } from 'ui/src/components/box'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { Text } from 'ui/src/components/typography'

interface IAssetNameCellProps {
	value?: any
	row?: any
}

export const AssetNameCell: React.FC<IAssetNameCellProps> = props => {
	const {
		value,
		row: { original },
	} = props

	const { id } = original
	const resourceAddress = '78374384783748374'

	return (
		<Box key={id} display="flex" alignItems="center" gap="medium">
			<ResourceImageIcon size="xlarge" address={resourceAddress} />
			<Text capitalizeFirstLetter size="small" color="strong" truncate weight="medium">
				{value} - lorem Nulla dolore veniam reprehenderit laborum cupidatat officia elit anim enim. Sint sit incididunt
				cupidatat esse laboris elit anim incididunt. Esse culpa officia enim non irure labore ut minim. Anim dolore duis
				quis sit ex ad aliqua eu adipisicing proident nisi voluptate. Quis deserunt id laboris proident amet aliquip.
			</Text>
		</Box>
	)
}
