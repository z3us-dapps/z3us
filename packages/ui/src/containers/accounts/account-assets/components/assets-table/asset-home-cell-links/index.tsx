import clsx from 'clsx'
import React, { useMemo } from 'react'

import { Box } from 'ui/src/components/box'
import { ChevronRightIcon } from 'ui/src/components/icons'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { Link } from 'ui/src/components/router-link'
import * as skeletonStyles from 'ui/src/components/styles/skeleton-loading.css'
import { Text } from 'ui/src/components/typography'
import { accountMenuSlugs } from 'ui/src/constants/accounts'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'
import { getRandomNumberInRange } from 'ui/src/utils/get-random-number-in-ranger'

import * as styles from './asset-home-cell-links.css'

interface IAssetHomeCellLinksProps {
	value?: any
	row?: any
}

export const AssetHomeCellLinks: React.FC<IAssetHomeCellLinksProps> = props => {
	const {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		value,
		row: { original },
	} = props

	const { id } = original
	const resourceAddress = '78374384783748374'
	const isMobile = useIsMobileWidth()

	const loading = useMemo(
		() => (
			<Box className={clsx(styles.assetHomeCellLinksLoadingWrapper, 'td-cell-loading')}>
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
		<Box key={id} className={styles.assetHomeCellLinksWrapper}>
			<Box className={clsx(styles.assetHomeCellLinksContentWrapper, 'td-cell')}>
				<Box alignItems="center" display="flex" justifyContent="flex-end" width="full">
					<Text weight="medium" size="small" color="strong" truncate>
						+ 7
					</Text>
					<Box className={styles.assetHomeCellLinksIconsWrapper}>
						<Link to={`${accountMenuSlugs.ACCOUNTS}/1`} underline="never">
							<ResourceImageIcon size={isMobile ? 'large' : 'xlarge'} address={resourceAddress} />
						</Link>
						<Link to={`${accountMenuSlugs.ACCOUNTS}/2`} underline="never">
							<ResourceImageIcon size={isMobile ? 'large' : 'xlarge'} address={resourceAddress} />
						</Link>
						<Link to={`${accountMenuSlugs.ACCOUNTS}/3`} underline="never">
							<ResourceImageIcon size={isMobile ? 'large' : 'xlarge'} address={resourceAddress} />
						</Link>
					</Box>
					<ChevronRightIcon />
				</Box>
			</Box>
			{loading}
		</Box>
	)
}
