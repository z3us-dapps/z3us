import type { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'
import clsx from 'clsx'
import {
	AnimatePresence,
	/** motion */
} from 'framer-motion'
import { config } from 'packages/ui/src/constants/config'
import { ACCOUNTS_ALL } from 'packages/ui/src/constants/routes'
import { useTransactions } from 'packages/ui/src/hooks/dapp/use-transactions'
import { getShortAddress } from 'packages/ui/src/utils/string-utils'
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
// import { animatePageVariants } from 'ui/src/constants/page'
import { useAccountParams } from 'ui/src/hooks/use-account-params'

import * as styles from './account-activity.css'

const ListContainer = React.forwardRef<HTMLDivElement>((props, ref) => <div ref={ref} {...props} />)

const ItemContainer = props => <Box {...props} className={styles.activityItem} />

interface IAllAccountListRowProps {
	index: number
	transaction: CommittedTransactionInfo
	selected: string
	hovered: string
	setHovered: (_: string) => void
	setSelected: (_: string) => void
}

const ItemWrapper: React.FC<IAllAccountListRowProps> = props => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { index, transaction, selected, hovered, setHovered, setSelected } = props

	const { pathname } = useLocation()

	const isSelected = selected === transaction.intent_hash_hex
	const isHovered = hovered === transaction.intent_hash_hex

	return (
		<Box className={styles.activityItemOuter}>
			<AnimatePresence initial={false}>
				{/* {!loaded && (
					<motion.div
						initial="hidden"
						animate="visible"
						variants={animatePageVariants}
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
					<Box
						className={clsx(styles.activityItemInner, (isSelected || isHovered) && styles.activityItemInnerSelected)}
					>
						<Link
							underline="never"
							to={`${pathname}?asset=xrd&transactionId=${transaction.intent_hash_hex}`}
							className={styles.activityItemInnerBtn}
							onClick={() => setSelected(transaction.intent_hash_hex)}
							onMouseOver={() => setHovered(transaction.intent_hash_hex)}
							onMouseLeave={() => setHovered(null)}
						>
							<Box className={styles.indicatorCircle}>
								<TransactionIcon transactionType="deposit" />
							</Box>
							<Box className={styles.activityItemTextWrapper}>
								<Text weight="stronger" size="small" color="strong" truncate>
									{getShortAddress(transaction.intent_hash_hex)}
								</Text>
								<Text size="xsmall" truncate>
									{transaction.confirmed_at?.toLocaleString()}
								</Text>
							</Box>
						</Link>
					</Box>
					<Box
						className={clsx(
							styles.activityItemExternalLinkWrapper,
							(isSelected || isHovered) && styles.activityItemExternalLinkWrapperActive,
						)}
					>
						<ToolTip theme="backgroundPrimary" message={<Translation capitalizeFirstLetter text="global.explorer" />}>
							<Button
								sizeVariant="small"
								styleVariant="ghost"
								iconOnly
								onMouseOver={() => setHovered(transaction.intent_hash_hex)}
								onMouseOut={() => setHovered(null)}
								onClick={() =>
									window
										.open(`${config.defaultExplorerURL}/transaction/${transaction.intent_hash_hex}`, '_blank')
										.focus()
								}
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

		const [selected, setSelected] = useState<string | null>(null)
		const [hovered, setHovered] = useState<string | null>(null)
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
