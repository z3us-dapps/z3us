import clsx from 'clsx'
import React, { useMemo } from 'react'

import { Box } from 'ui/src/components/box'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import * as skeletonStyles from 'ui/src/components/styles/skeleton-loading.css'
import { Text } from 'ui/src/components/typography'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'
import { getRandomNumberInRange } from 'ui/src/utils/get-random-number-in-ranger'

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

	const loading = useMemo(
		() => (
			<Box className={clsx(styles.assetNameCellLoadingWrapper, 'td-cell-loading')}>
				<Box className={clsx(skeletonStyles.tokenListSkeleton, skeletonStyles.tokenListGridCircle)} />
				<Box display="flex" width="full" flexDirection="column" gap="small" flexGrow={1}>
					<Box
						className={skeletonStyles.tokenListSkeleton}
						style={{ height: '12px', width: `${getRandomNumberInRange(50, 90)}%` }}
					/>
					<Box
						className={skeletonStyles.tokenListSkeleton}
						style={{ height: '12px', width: `${getRandomNumberInRange(40, 70)}%` }}
					/>
				</Box>
			</Box>
		),
		[],
	)

	return (
		<Box key={id} className={styles.assetNameCellWrapper}>
			<Box className={clsx(styles.assetNameCellContentWrapper, 'td-cell')}>
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
			{loading}
		</Box>
	)
}