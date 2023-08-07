import clsx from 'clsx'
import { useAssetParam } from 'packages/ui/src/hooks/use-params'
import React from 'react'
import { useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import * as tableHeadStyles from 'ui/src/components/styles/table-head-shadow.css'
import { Table } from 'ui/src/components/table'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'

import { useStakingTable } from '../../use-staking-table'
import * as styles from './staking-validators.css'

interface IAccountRoutesProps {
	scrollableNode: HTMLElement
	isScrolledTop: boolean
}

export const StakingValidators: React.FC<IAccountRoutesProps> = props => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { isScrolledTop, scrollableNode } = props

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { assetType } = useParams()

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const asset = useAssetParam()

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { items, columns, loading, loadMore, onRowSelected, onEndReached } = useStakingTable()

	return (
		<Box
			className={clsx(
				styles.stakingValidatorsWrapper,
				!loading && !isScrolledTop && tableHeadStyles.accountTheadShadow,
			)}
		>
			<Box className={styles.stakingValidatorsHeaderWrapper}>
				<Box className={styles.stakingValidatorsHeaderLeftWrapper}>
					<Text capitalizeFirstLetter size="xxlarge" weight="strong" color="strong">
						<Translation text="staking.stakingValidators.title" />
					</Text>
					<Box maxWidth="small">
						<Text capitalizeFirstLetter size="small">
							<Translation text="staking.stakingValidators.subTitle" />
						</Text>
					</Box>
					<Box display="flex">
						<Text capitalizeFirstLetter size="small">
							Search
						</Text>
						<Text capitalizeFirstLetter size="small">
							Filter
						</Text>
					</Box>
				</Box>
				<Box className={styles.stakingValidatorsHeaderRightWrapper}>
					<Text capitalizeFirstLetter size="xxlarge" weight="strong" color="strong">
						<Translation text="staking.stakingValidators.title" />
					</Text>
					<Box maxWidth="small">
						<Text capitalizeFirstLetter size="small">
							<Translation text="staking.stakingValidators.subTitle" />
						</Text>
					</Box>
				</Box>
			</Box>
			<Table
				className={styles.stakingValidatorsTableMinHeightWrapper}
				styleVariant="primary"
				sizeVariant="large"
				scrollableNode={scrollableNode ?? undefined}
				data={items}
				columns={columns}
				// loading
				loading={loading}
				loadMore={loadMore}
				onRowSelected={onRowSelected}
				// onEndReached={onEndReached}
			/>
		</Box>
	)
}
