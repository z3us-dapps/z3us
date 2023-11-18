import clsx from 'clsx'
import React from 'react'

import { Box } from 'ui/src/components/box'
import * as skeletonStyles from 'ui/src/components/styles/skeleton-loading.css'
import { getRandomNumberInRange } from 'ui/src/utils/get-random-number-in-ranger'

import * as styles from './styles.css'

export const ValidatorLoadingSkeleton: React.FC = () => (
	<Box className={styles.validatorSkeletonWrapper}>
		<Box className={styles.validatorSkeletonHeaderWrapper}>
			<Box className={clsx(styles.validatorSkeletonAvatar, skeletonStyles.tokenListSkeleton)} />
			<Box className={clsx(styles.validatorSkeletonFee, skeletonStyles.tokenListSkeleton)} />
			<Box className={clsx(styles.validatorSkeletonFeeAmount, skeletonStyles.tokenListSkeleton)} />
			<Box className={clsx(styles.validatorSkeletonFeeCurrency, skeletonStyles.tokenListSkeleton)} />
		</Box>
		<Box className={styles.validatorSkeletonBodyWrapper}>
			<Box className={clsx(styles.validatorSkeletonBodyDetail, skeletonStyles.tokenListSkeleton)} />
			{Array.from({ length: 7 }, (_, i) => (
				<Box key={i} className={styles.validatorSkeletonBodyItem}>
					<Box
						className={clsx(styles.validatorSkeletonBodyItemLeft, skeletonStyles.tokenListSkeleton)}
						style={{ width: `${getRandomNumberInRange(20, 90)}px` }}
					/>
					<Box
						className={clsx(styles.validatorSkeletonBodyItemRight, skeletonStyles.tokenListSkeleton)}
						style={{ width: `${getRandomNumberInRange(100, 140)}px` }}
					/>
				</Box>
			))}
		</Box>
	</Box>
)
