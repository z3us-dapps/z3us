import clsx from 'clsx'
import React from 'react'

import { Box } from 'ui/src/components/box'
import * as skeletonStyles from 'ui/src/components/styles/skeleton-loading.css'
import { getRandomNumberInRange } from 'ui/src/utils/number'

import * as styles from './styles.css'

export const TransactionLoadingSkeleton: React.FC = () => (
	<Box className={styles.transactionSkeletonWrapper}>
		<Box className={styles.transactionSkeletonHeaderWrapper}>
			<Box className={clsx(styles.transactionSkeletonAvatar, skeletonStyles.tokenListSkeleton)} />
			<Box className={clsx(styles.transactionSkeletonFee, skeletonStyles.tokenListSkeleton)} />
			<Box className={clsx(styles.transactionSkeletonFeeAmount, skeletonStyles.tokenListSkeleton)} />
			<Box className={clsx(styles.transactionSkeletonFeeCurrency, skeletonStyles.tokenListSkeleton)} />
		</Box>
		<Box className={styles.transactionSkeletonBodyWrapper}>
			<Box className={clsx(styles.transactionSkeletonBodyDetail, skeletonStyles.tokenListSkeleton)} />
			{Array.from({ length: 7 }, (_, i) => (
				<Box key={i} className={styles.transactionSkeletonBodyItem}>
					<Box
						className={clsx(styles.transactionSkeletonBodyItemLeft, skeletonStyles.tokenListSkeleton)}
						style={{ width: `${getRandomNumberInRange(20, 90)}px` }}
					/>
					<Box
						className={clsx(styles.transactionSkeletonBodyItemRight, skeletonStyles.tokenListSkeleton)}
						style={{ width: `${getRandomNumberInRange(100, 140)}px` }}
					/>
				</Box>
			))}
		</Box>
	</Box>
)
