import clsx from 'clsx'
import React, { useMemo } from 'react'

import { Box } from 'ui/src/components/box'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { Link } from 'ui/src/components/router-link'
import * as skeletonStyles from 'ui/src/components/styles/skeleton-loading.css'
import { Text } from 'ui/src/components/typography'
import { accountMenuSlugs } from 'ui/src/constants/accounts'
import { getRandomNumberInRange } from 'ui/src/utils/get-random-number-in-ranger'

import * as styles from './asset-home-cell.css'

interface IAssetHomeCellProps {
	value?: any
	row?: any
}

export const AssetHomeCell: React.FC<IAssetHomeCellProps> = props => {
	const {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
				<Box className={styles.assetHomeCellLoadingMobileWrapper}>
					<Box className={skeletonStyles.tokenListSkeleton} style={{ height: '12px', width: '20px' }} />
					<Box className={styles.assetHomeCellLoadingMobileIconsWrapper}>
						{Array.from({ length: getRandomNumberInRange(2, 4) }, (_, i) => (
							<Box
								key={i}
								className={clsx(skeletonStyles.tokenListSkeleton, skeletonStyles.tokenListGridCircleSmall)}
							/>
						))}
					</Box>
				</Box>
			</Box>
		),
		[],
	)

	return (
		<Box key={id} className={styles.assetHomeCellWrapper}>
			<Box className={clsx(styles.assetHomeCellContentWrapper, 'td-cell')}>
				<Box flexGrow={1}>
					<Box display="flex" gap="xxsmall">
						<Text className="tr-text-elem" weight="medium" size="small" color="strong" truncate>
							Tokens
						</Text>
						<Text size="small" truncate>
							(12)
						</Text>
					</Box>
					<Box display="flex" gap="xxsmall">
						<Text weight="strong" size="small" color="strong" truncate>
							$12,297
						</Text>
						<Text size="small" color="green" truncate>
							+0.12%
						</Text>
					</Box>
				</Box>
				<Box className={styles.assetHomeCellLoadingMobileWrapper}>
					<Box className={styles.assetHomeCellLoadingMobileIconsWrapper}>
						<Link to={`${accountMenuSlugs.ACCOUNTS}/1`} underline="never">
							<ResourceImageIcon size="large" address="asdfasdf" />
						</Link>
						<Link to={`${accountMenuSlugs.ACCOUNTS}/2`} underline="never">
							<ResourceImageIcon size="large" address="asdfasdf" />
						</Link>
						<Link to={`${accountMenuSlugs.ACCOUNTS}/3`} underline="never">
							<ResourceImageIcon size="large" address="asdfasdf" />
						</Link>
					</Box>
				</Box>
			</Box>
			{loading}
		</Box>
	)
}
