import clsx from 'clsx'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { NftImageIcon } from 'ui/src/components/nft-image-icon'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { Text } from 'ui/src/components/typography'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import type { ResourceBalance, ResourceBalanceKind, ResourceBalanceType } from 'ui/src/types'

import * as styles from './styles.css'

interface IProps {
	value?: string
	row?: { original: ResourceBalanceKind }
}

export const NftNameCell: React.FC<IProps> = props => {
	const {
		value,
		row: { original },
	} = props

	return (
		<Box className={styles.nftNameCellWrapper}>
			<Box className={clsx(styles.nftNameCellContentWrapper, 'td-cell')}>
				<ResourceImageIcon size={{ mobile: 'large', tablet: 'xlarge' }} address={value} />
				<Box className={styles.nftNameCellStatsWrapper}>
					<Box className={styles.nftNameCellNameWrapper}>
						<Text capitalizeFirstLetter size="small" color="strong" truncate weight="medium">
							TODO: get collection name here?
						</Text>
						<Box className={styles.nftNameCellNameIdWrapper}>
							<Text capitalizeFirstLetter size="xsmall" truncate weight="medium">
								{original.non_fungible_id}
							</Text>
						</Box>
					</Box>
					<Box className={styles.nftNameCellPriceWrapper}>
						<NftImageIcon
							id={original.non_fungible_id}
							size={{ mobile: 'large', tablet: 'xlarge' }}
							address={original.collection}
						/>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
