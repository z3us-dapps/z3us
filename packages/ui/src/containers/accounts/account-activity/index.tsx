import type { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'
import clsx from 'clsx'
import {
	AnimatePresence,
	/** motion */
} from 'framer-motion'
import { ACCOUNTS_ALL } from 'packages/ui/src/constants/routes'
import { useTransactions } from 'packages/ui/src/hooks/dapp/use-transactions'
import React, { forwardRef, useCallback, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Virtuoso } from 'react-virtuoso'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { ShareIcon } from 'ui/src/components/icons'
import { Link } from 'ui/src/components/router-link'
// import * as skeletonStyles from 'ui/src/components/styles/skeleton-loading.css'
import { ToolTip } from 'ui/src/components/tool-tip'
import { TransactionIcon } from 'ui/src/components/transaction-icon'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
// import { animtePageVariants } from 'ui/src/constants/page'
import { useAccountParams } from 'ui/src/hooks/use-account-params'

import * as styles from './account-activity.css'

const ListContainer = React.forwardRef<HTMLDivElement>((props, ref) => <div ref={ref} {...props} />)

const ItemContainer = props => <Box {...props} className={styles.activtyItem} />

interface IAllAccountListRowProps {
	index: number
	transaction: CommittedTransactionInfo
	selected: number
	hovered: number
	setHovered: (number) => void
	setSelected: (number) => void
}

const ItemWrapper: React.FC<IAllAccountListRowProps> = props => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { index, transaction, selected, hovered, setHovered, setSelected } = props

	const { pathname } = useLocation()

	const isSelected = selected === index
	const isHovered = hovered === index

	return (
		<Box className={styles.activtyItemOuter}>
			<AnimatePresence initial={false}>
				{/* {!loaded && (
					<motion.div
						initial="hidden"
						animate="visible"
						variants={animtePageVariants}
						style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0' }}
					>
						<Box
							width="full"
							height="full"
							display="flex"
							gap="small"
							flexDirection="column"
							justifyContent="center"
							borderBottom={1}
							borderStyle="solid"
							borderColor="borderDivider"
						>
							<Box display="flex" alignItems="center" gap="medium">
								<Box className={clsx(skeletonStyles.tokenListSkeleton, skeletonStyles.tokenListGridCircle)} />
								<Box flexGrow={1} display="flex" flexDirection="column" gap="small">
									<Box
										className={skeletonStyles.tokenListSkeleton}
										style={{ height: '12px', width: index % 2 === 0 ? '25%' : '35%' }}
									/>
									<Box
										className={skeletonStyles.tokenListSkeleton}
										style={{ height: '12px', width: index % 2 === 0 ? '35%' : '45%' }}
									/>
								</Box>
							</Box>
						</Box>
					</motion.div>
				)} */}
				{/* {loaded && ( */}
				<>
					<Box className={clsx(styles.activtyItemInner, (isSelected || isHovered) && styles.activtyItemInnerSelected)}>
						<Link
							underline="never"
							to={`${pathname}?asset=xrd&transactionId=1eaf53c4256c384d76ca72c0f18ef37a2e4441d4e6bae450e2b8507f42faa5b6`}
							// to={`/accounts/transactions/btc/1eaf53c4256c384d76ca72c0f18ef37a2e4441d4e6bae450e2b8507f42faa5b6`}
							className={styles.activtyItemInnerBtn}
							// onClick={handleClickItem}
							onMouseOver={() => setHovered(index)}
							onMouseLeave={() => setHovered(null)}
						>
							<Box className={styles.indicatorCircle}>
								<TransactionIcon transactionType="deposit" />
							</Box>
							<Box className={styles.activtyItemTextWrapper}>
								<Text weight="stronger" size="small" color="strong" truncate>
									{transaction.transaction_status}
								</Text>
								<Text size="xsmall" truncate>
									{transaction.confirmed_at?.toLocaleString()}
								</Text>
							</Box>
						</Link>
					</Box>
					<Box
						className={clsx(
							styles.activtyItemExternalLinkWrapper,
							(isSelected || isHovered) && styles.activtyItemExternalLinkWrapperActive,
						)}
					>
						<ToolTip theme="backgroundPrimary" message={<Translation capitalizeFirstLetter text="global.explorer" />}>
							<Button
								sizeVariant="small"
								styleVariant="ghost"
								iconOnly
								// to="https://explorer.radixdlt.com/"
								// target="_blank"
								// onMouseOver={() => setHovered(index)}
								// onMouseLeave={() => setHovered(null)}
							>
								<ShareIcon />
							</Button>
						</ToolTip>
					</Box>
				</>
				{/* )} */}
			</AnimatePresence>
		</Box>
	)
}

interface IAccountActivityRequiredProps {
	scrollableNode: HTMLElement
}

interface IAccountActivityOptionalProps {}

interface IAccountActivityProps extends IAccountActivityRequiredProps, IAccountActivityOptionalProps {}

const defaultProps: IAccountActivityOptionalProps = {}

export const AccountActivity = forwardRef<HTMLElement, IAccountActivityProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { scrollableNode } = props

		const [selected, setSelected] = useState<number | null>(null)
		const [hovered, setHovered] = useState<number | null>(null)
		const { account } = useAccountParams()

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { isFetching, data, error, fetchNextPage, hasNextPage } = useTransactions(
			account !== ACCOUNTS_ALL ? { [account]: null } : null,
		)

		const flatten = data?.pages.reduce((container, page) => [...container, ...page.items], []) || []

		const loadMore = useCallback(() => {
			if (isFetching) return
			if (hasNextPage) {
				fetchNextPage()
			}
		}, [isFetching, fetchNextPage, hasNextPage])

		return (
			<Box ref={ref} className={clsx(styles.activityWrapper)} style={{ minHeight: '100px' }}>
				<Virtuoso
					customScrollParent={scrollableNode}
					totalCount={flatten.length}
					data={flatten}
					endReached={loadMore}
					// eslint-disable-next-line react/no-unstable-nested-components
					itemContent={(index, tx) => (
						<ItemWrapper
							index={index}
							transaction={tx}
							selected={selected}
							setSelected={setSelected}
							hovered={hovered}
							setHovered={setHovered}
						/>
					)}
					components={{
						List: ListContainer,
						Item: ItemContainer,
					}}
				/>
			</Box>
		)
	},
)

AccountActivity.defaultProps = defaultProps
