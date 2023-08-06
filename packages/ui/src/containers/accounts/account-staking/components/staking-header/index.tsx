import { useAssetParam } from 'packages/ui/src/hooks/use-params'
import React from 'react'
import { useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Text } from 'ui/src/components/typography'

import * as styles from './staking-header.css'

interface IAccountRoutesProps {
	scrollableNode: HTMLElement
	isScrolledTop: boolean
}

export const StakingHeader: React.FC<IAccountRoutesProps> = props => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { isScrolledTop, scrollableNode } = props

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { assetType } = useParams()

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const asset = useAssetParam()

	return (
		<Box className={styles.stakingHeaderWrapper}>
			<Box display="flex" width="full">
				<Box flexGrow={1}>
					<Text>Header</Text>
				</Box>
			</Box>
		</Box>
	)
}
