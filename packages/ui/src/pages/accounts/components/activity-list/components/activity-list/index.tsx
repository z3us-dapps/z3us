import type { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, { forwardRef, useCallback, useEffect, useMemo, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useSearchParams } from 'react-router-dom'
import { Virtuoso } from 'react-virtuoso'

import { Box } from 'ui/src/components/box'
import { Link } from 'ui/src/components/router-link'
import { useScroll } from 'ui/src/components/scroll-area-radix/use-scroll'
import * as skeletonStyles from 'ui/src/components/styles/skeleton-loading.css'
import { TimeFromNow } from 'ui/src/components/time-from-now'
import { TokenPrice } from 'ui/src/components/token-price'
import { Text } from 'ui/src/components/typography'
import { animatePageVariants } from 'ui/src/constants/page'
import { useKnownAddresses } from 'ui/src/hooks/dapp/use-known-addresses'
import { useTransactions } from 'ui/src/hooks/dapp/use-transactions'
import { useSelectedAccounts } from 'ui/src/hooks/use-accounts'
import { useIsTransactionVisible } from 'ui/src/pages/accounts/hooks/use-is-transaction-visible'
import { getShortAddress } from 'ui/src/utils/string-utils'

import * as styles from './styles.css'

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
	const [searchParams, setSearchParams] = useSearchParams()
	const { index, transaction, selected, hovered, setHovered, setSelected } = props

	const { data: knownAddresses } = useKnownAddresses()

	const isSelected = selected === transaction?.intent_hash
	const isHovered = hovered === transaction?.intent_hash

	const handleClick = () => {
		setSelected(transaction.intent_hash)
		setHovered(null)
		searchParams.set('tx', `${transaction.intent_hash}`)
		setSearchParams(searchParams)
	}

	return (
		<Box className={styles.activityItemOuter}>
			<AnimatePresence initial={false}>
				{!transaction && <SkeletonRow index={index} />}
				{transaction && (
					<Box
						className={clsx(styles.activityItemInner, (isSelected || isHovered) && styles.activityItemInnerSelected)}
					>
						<Link
							underline="never"
							className={styles.activityItemInnerBtn}
							onClick={handleClick}
							onMouseOver={() => setHovered(transaction.intent_hash)}
							onMouseLeave={() => setHovered(null)}
						>
							<Box className={styles.activityItemTextWrapper}>
								<Text weight="stronger" size="small" color="strong" truncate>
									{getShortAddress(transaction.intent_hash)}
								</Text>
								<Text size="xsmall" truncate>
									<TimeFromNow date={transaction.confirmed_at} />
								</Text>
							</Box>
							<Box className={styles.activityItemTextWrapper}>
								<Text size="xsmall">
									<TokenPrice amount={transaction.fee_paid as any} address={knownAddresses?.resourceAddresses.xrd} />
								</Text>
							</Box>
							<Box className={styles.activityItemTextWrapper}>
								<Text size="xsmall">{transaction.transaction_status}</Text>
							</Box>
						</Link>
					</Box>
				)}
			</AnimatePresence>
		</Box>
	)
}

const messages = defineMessages({
	title: {
		defaultMessage: 'Activity',
		id: 'ZmlNQ3',
	},
})

const skeletons = [null, null, null, null, null]

interface IProps {
	className?: string
}

export const ActivityList = forwardRef<HTMLButtonElement, IProps>((props, ref: React.Ref<HTMLElement | null>) => {
	const { className } = props
	const { scrollableNode } = useScroll()
	const intl = useIntl()

	const isTransactionVisible = useIsTransactionVisible()
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

	useEffect(() => {
		if (selected && !isTransactionVisible) {
			setSelected(null)
		}
	}, [isTransactionVisible, selected])

	const renderItem = useCallback(
		(index: number, tx?: CommittedTransactionInfo) => (
			<ItemWrapper
				key={index}
				index={index}
				transaction={tx}
				selected={selected}
				setSelected={setSelected}
				hovered={hovered}
				setHovered={setHovered}
			/>
		),
		[],
	)

	return (
		<Box ref={ref} className={clsx(styles.activityWrapper, className)} style={{ minHeight: '100px' }}>
			<Box className={styles.activityTitleText}>
				<Text color="strong" size="xlarge" weight="strong">
					{intl.formatMessage(messages.title)}
				</Text>
			</Box>
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
