import React from 'react'

import { Box } from 'ui/src/components/box'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { Text } from 'ui/src/components/typography'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'

import * as styles from './asset-name-cell.css'

interface IAssetNameCellProps {
	value?: any
	row?: any
}

export const AssetNameCell: React.FC<IAssetNameCellProps> = props => {
	const {
		value,
		row: { original },
	} = props
	const isMobile = useIsMobileWidth()

	const { id } = original
	const resourceAddress = '78374384783748374'

	return (
		<Box key={id} className={styles.assetNameCellWrapper}>
			<ResourceImageIcon size={isMobile ? 'large' : 'xlarge'} address={resourceAddress} />
			<Box className={styles.assetNameCellStatsWrapper}>
				<Box className={styles.assetNameCellNameWrapper}>
					<Text className="tr-text-elem" capitalizeFirstLetter size="small" color="strong" truncate weight="medium">
						{value} - lorem Nulla dolore veniam reprehenderit laborum cupidatat officia elit anim enim. Sint sit
						incididunt cupidatat esse laboris elit anim incididunt. Esse culpa officia enim non irure labore ut minim.
						Anim dolore duis quis sit ex ad aliqua eu adipisicing proident nisi voluptate. Quis deserunt id laboris
						proident amet aliquip.
					</Text>
					<Box className={styles.assetNameCellBalanceWrapper}>
						<Text capitalizeFirstLetter size="xsmall" truncate weight="regular">
							$4,35848484884848484848484848484884488.54
						</Text>
					</Box>
				</Box>
				<Box className={styles.assetNameCellPriceWrapper}>
					<Text
						capitalizeFirstLetter
						size="small"
						color="strong"
						truncate
						weight="medium"
						className={styles.assetNameCellPriceTextWrapper}
					>
						$4,35848484884848484848484848484884488.54
					</Text>
					<Text
						capitalizeFirstLetter
						size="xsmall"
						truncate
						weight="medium"
						color="red"
						className={styles.assetNameCellPriceTextWrapper}
					>
						-1.78%
					</Text>
				</Box>
			</Box>
		</Box>
	)
}
