import clsx from 'clsx'
import React, { useMemo } from 'react'

import { Box } from 'ui/src/components/box'
import * as skeletonStyles from 'ui/src/components/styles/skeleton-loading.css'
import { Text } from 'ui/src/components/typography'
import { getRandomNumberInRange } from 'ui/src/utils/get-random-number-in-ranger'

import * as styles from './asset-home-cell.css'

interface IAssetHomeCellProps {
	value?: any
	row?: any
}

export const AssetHomeCell: React.FC<IAssetHomeCellProps> = props => {
	const {
		value,
		row: { original },
	} = props

	const { id } = original

	const loading = useMemo(
		() => (
			<Box className={clsx(styles.assetHomeCellLoadingWrapper, 'td-cell-loading')}>
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
		<Box key={id} className={styles.assetHomeCellWrapper}>
			<Box className={clsx(styles.assetHomeCellContentWrapper, 'td-cell')}>
				<Text size="small" color="strong" truncate>
					{value}
				</Text>
			</Box>
			{loading}
		</Box>
	)
}
