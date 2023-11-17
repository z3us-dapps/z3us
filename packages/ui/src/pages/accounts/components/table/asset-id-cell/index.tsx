import React from 'react'

import { Box } from 'ui/src/components/box'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import { getShortAddress } from 'ui/src/utils/string-utils'

import * as styles from '../asset-text-cell/styles.css'

interface IProps {
	value?: string
}

export const AssetIdCell: React.FC<IProps> = props => {
	const { value } = props

	return (
		<Box className={styles.assetTextCellWrapper}>
			<ToolTip message={value}>
				<Box>
					<Text capitalizeFirstLetter size="small" truncate weight="medium">
						{getShortAddress(value)}
					</Text>
				</Box>
			</ToolTip>
		</Box>
	)
}
