import type { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'
import clsx from 'clsx'
import React, { forwardRef, useCallback, useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { Virtuoso } from 'react-virtuoso'

import { Box } from 'ui/src/components/box'
import { useScroll } from 'ui/src/components/scroll-area-radix/use-scroll'
import { Text } from 'ui/src/components/typography'
import { useTransactions } from 'ui/src/hooks/dapp/use-transactions'
import { useSelectedAccounts } from 'ui/src/hooks/use-accounts'
import { useIsTransactionVisible } from 'ui/src/pages/accounts/hooks/use-is-transaction-visible'

import { PageWrapper } from './page-wrapper'
import { SkeletonRow } from './skeleton-row'
import * as styles from './styles.css'

const ListContainer = React.forwardRef<HTMLDivElement>((props, ref) => <div ref={ref} {...props} />)

const ItemContainer = props => <Box {...props} className={styles.activityItem} />

const messages = defineMessages({
	title: {
		defaultMessage: 'Activity',
		id: 'ZmlNQ3',
	},
})

interface IProps {
	resourceId?: string
	className?: string
}

export const ActivityList = forwardRef<HTMLButtonElement, IProps>(
	({ className, resourceId }, ref: React.Ref<HTMLElement | null>) => {
		const { scrollableNode } = useScroll()
		const intl = useIntl()

		const isTransactionVisible = useIsTransactionVisible()
		const [selected, setSelected] = useState<string | null>(null)
		const [hovered, setHovered] = useState<string | null>(null)

		const addresses = useSelectedAccounts()
		const { isFetching, data, fetchNextPage, hasNextPage } = useTransactions(addresses, resourceId)

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

		const renderItem = useCallback((index: number, page: { items: CommittedTransactionInfo[] }) => {
			const uniqueTransactionIds = new Set()

			const uniqueTransactions = page.items.filter(transaction => {
				if (uniqueTransactionIds.has(transaction.intent_hash)) {
					return false
				}

				uniqueTransactionIds.add(transaction.intent_hash)
				return true
			})

			return (
				<PageWrapper
					key={index}
					transactions={uniqueTransactions}
					selected={selected}
					setSelected={setSelected}
					hovered={hovered}
					setHovered={setHovered}
				/>
			)
		}, [])

		return (
			<Box ref={ref} className={clsx(styles.activityWrapper, className)} style={{ minHeight: '100px' }}>
				<Box className={styles.activityTitleText}>
					<Text color="strong" size="xlarge" weight="strong">
						{intl.formatMessage(messages.title)}
					</Text>
				</Box>

				<Virtuoso
					customScrollParent={scrollableNode}
					totalCount={data?.pages.length}
					data={data?.pages}
					endReached={loadMore}
					itemContent={renderItem}
					components={{
						List: ListContainer,
						Item: ItemContainer,
					}}
				/>

				{isFetching &&
					Array.from({ length: 6 }, (_, i) => (
						<Box key={i} paddingX="large">
							<Box paddingY="small" borderBottom={1} borderStyle="solid" borderColor="borderDivider">
								<SkeletonRow index={i} />{' '}
							</Box>
						</Box>
					))}
			</Box>
		)
	},
)
