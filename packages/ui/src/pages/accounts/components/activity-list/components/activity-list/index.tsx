import type { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, { forwardRef, useCallback, useMemo, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { Virtuoso } from 'react-virtuoso'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { ShareIcon } from 'ui/src/components/icons'
import { Link } from 'ui/src/components/router-link'
import { useScroll } from 'ui/src/components/scroll-area-radix/use-scroll'
import * as skeletonStyles from 'ui/src/components/styles/skeleton-loading.css'
import { TimeFromNow } from 'ui/src/components/time-from-now'
import { TokenPrice } from 'ui/src/components/token-price'
import { ToolTip } from 'ui/src/components/tool-tip'
import { TransactionIcon } from 'ui/src/components/transaction-icon'
import { Text } from 'ui/src/components/typography'
import { config } from 'ui/src/constants/config'
import { animatePageVariants } from 'ui/src/constants/page'
import { useKnownAddresses } from 'ui/src/hooks/dapp/use-known-addresses'
import { useTransactions } from 'ui/src/hooks/dapp/use-transactions'
import { useSelectedAccounts } from 'ui/src/hooks/use-accounts'
import { getShortAddress } from 'ui/src/utils/string-utils'

import * as styles from './styles.css'

const messages = defineMessages({
	explorer: {
		id: 'accounts.activity_list.explorer',
		defaultMessage: 'Explorer',
	},
})

const ListContainer = React.forwardRef<HTMLDivElement>((props, ref) => <div ref={ref} {...props} />)

const ItemContainer = props => <Box {...props} className={styles.activityItem} />

const SkeletonRow = ({ index }: { index: number }) => (
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
						style={{ height: '12px', width: 2 % index === 0 ? '25%' : '35%' }}
					/>
					<Box
						className={skeletonStyles.tokenListSkeleton}
						style={{ height: '12px', width: 2 % index === 0 ? '35%' : '45%' }}
					/>
				</Box>
			</Box>
		</Box>
	</motion.div>
)

interface IRowProps {
	index: number
	transaction?: CommittedTransactionInfo
	selected: string
	hovered: string
	setHovered: (_: string) => void
	setSelected: (_: string) => void
}

const ItemWrapper: React.FC<IRowProps> = props => {
	const { index, transaction, selected, hovered, setHovered, setSelected } = props

	const intl = useIntl()
	const { data: knownAddresses } = useKnownAddresses()

	const isSelected = selected === transaction?.intent_hash
	const isHovered = hovered === transaction?.intent_hash

	const addTransactionIdToPath = (txId: string) => {
		const [path, params] = window.location.hash.substring(1).split('?')
		const query = new URLSearchParams(params)
		query.set('tx', `${txId}`)
		return `${path}?${query}`
	}

	return (
		<Box className={styles.activityItemOuter}>
			<AnimatePresence initial={false}>
				{!transaction && <SkeletonRow index={index} />}
				{transaction && (
					<>
						<Box
							className={clsx(styles.activityItemInner, (isSelected || isHovered) && styles.activityItemInnerSelected)}
						>
							<Link
								underline="never"
								to={addTransactionIdToPath(transaction.intent_hash)}
								className={styles.activityItemInnerBtn}
								onClick={() => setSelected(transaction.intent_hash)}
								onMouseOver={() => setHovered(transaction.intent_hash)}
								onMouseLeave={() => setHovered(null)}
							>
								<Box className={styles.indicatorCircle}>
									<TransactionIcon transactionType="deposit" />
								</Box>
								<Box className={styles.activityItemTextWrapper}>
									<Text weight="stronger" size="small" color="strong" truncate>
										{getShortAddress(transaction.intent_hash)}
									</Text>
									<Text size="xsmall" truncate>
										<TimeFromNow date={transaction.confirmed_at} />
									</Text>
								</Box>
								<Box className={styles.activityItemTextWrapper}>
									<Text size="xsmall">{transaction.transaction_status}</Text>
								</Box>
								<Box className={styles.activityItemTextWrapper}>
									<Text size="xsmall">
										<TokenPrice
											amount={(transaction.fee_paid as any)?.value}
											address={knownAddresses?.resourceAddresses.xrd}
										/>
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
							<ToolTip message={intl.formatMessage(messages.explorer)}>
								<Button
									sizeVariant="small"
									styleVariant="ghost"
									iconOnly
									onMouseOver={() => setHovered(transaction.intent_hash)}
									onMouseOut={() => setHovered(null)}
									onClick={() =>
										window.open(`${config.defaultExplorerURL}/transaction/${transaction.intent_hash}`, '_blank').focus()
									}
								>
									<ShareIcon />
								</Button>
							</ToolTip>
						</Box>
					</>
				)}
			</AnimatePresence>
		</Box>
	)
}

const skeletons = [null, null, null, null, null]

interface IProps {
	className?: string
}

export const ActivityList = forwardRef<HTMLButtonElement, IProps>((props, ref: React.Ref<HTMLElement | null>) => {
	const { className } = props
	const { scrollableNode } = useScroll()

	const [selected, setSelected] = useState<string | null>(null)
	const [hovered, setHovered] = useState<string | null>(null)

	const addresses = useSelectedAccounts()
	const { isFetching, data, fetchNextPage, hasNextPage } = useTransactions(addresses)

	const flattenWithLoading = useMemo(() => {
		const uniqueItems = new Map()
		data?.pages.forEach(page =>
			page.items.forEach((item: CommittedTransactionInfo) => {
				if (!uniqueItems.has(item.intent_hash)) uniqueItems.set(item.intent_hash, item)
			}),
		)
		const sortedItems = Array.from(uniqueItems.values()).sort(
			(a, b) => new Date(b.round_timestamp).getTime() - new Date(a.round_timestamp).getTime(),
		)
		return hasNextPage && isFetching ? [...sortedItems, ...skeletons] : sortedItems
	}, [data])

	const loadMore = useCallback(() => {
		if (isFetching) return
		if (hasNextPage) {
			fetchNextPage()
		}
	}, [isFetching, fetchNextPage, hasNextPage])

	const renderItem = (index: number, tx?: CommittedTransactionInfo) => (
		<ItemWrapper
			index={index}
			transaction={tx}
			selected={selected}
			setSelected={setSelected}
			hovered={hovered}
			setHovered={setHovered}
		/>
	)

	return (
		<Box ref={ref} className={clsx(styles.activityWrapper, className)} style={{ minHeight: '100px' }}>
			<Virtuoso
				customScrollParent={scrollableNode}
				totalCount={flattenWithLoading.length}
				data={flattenWithLoading}
				endReached={loadMore}
				itemContent={renderItem}
				components={{
					List: ListContainer,
					Item: ItemContainer,
				}}
			/>
		</Box>
	)
})
