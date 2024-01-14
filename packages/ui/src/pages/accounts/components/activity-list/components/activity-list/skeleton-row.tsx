import clsx from 'clsx'
import React from 'react'

import { Box } from 'ui/src/components/box'
import * as skeletonStyles from 'ui/src/components/styles/skeleton-loading.css'

export const SkeletonRow = ({ index }: { index: number }) => (
	<Box
		width="full"
		height="full"
		display="flex"
		gap="small"
		flexDirection="column"
		justifyContent="center"
		style={{ height: '50px' }}
	>
		<Box display="flex" alignItems="center" gap="medium">
			<Box className={clsx(skeletonStyles.tokenListSkeleton, skeletonStyles.tokenListGridCircle)} />
			<Box flexGrow={1} display="flex" flexDirection="column" gap="small">
				<Box
					className={skeletonStyles.tokenListSkeleton}
					style={{ height: '12px', width: 2 % index === 0 ? '25%' : '35%' }}
				/>
				<Box
					className={skeletonStyles.tokenListSkeleton}
					style={{ height: '12px', width: 2 % index === 0 ? '35%' : '45%' }}
				/>
			</Box>
		</Box>
	</Box>
)
