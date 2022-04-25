/* eslint-disable react/no-array-index-key */
import React, { useRef, useCallback, useEffect } from 'react'
import { ScrollArea } from '@src/components/scroll-area'
import { useTransactionHistory } from '@src/services/react-query/queries/radix'
import { ActivityItem } from '@src/components/activity-item'
import { useRoute } from 'wouter'
import { Text, Box } from 'ui/src/components/atoms'
import { getSplitParams } from '@src/utils/url-utils'
import { SlideUpPanel } from '../slide-up-panel'
import { TokenInfo } from '../token-info'

export const Token: React.FC = () => {
	const [, params] = useRoute('/account/token/:rri')
	const rri = getSplitParams(params)
	const observer = useRef<IntersectionObserver | null>(null)
	const { isFetching, data, error, fetchNextPage, hasNextPage } = useTransactionHistory(10)

	const flatten =
		data?.pages
			.map(page =>
				page.transactions
					.map(t => ({ ...t, actions: t.actions.filter(a => (a as any)?.rri === rri) }))
					.filter(t => t.actions.length > 0)
					.reduce((container, t) => [...container, ...t.actions.map(a => ({ t, a }))], []),
			)
			.reduce((container, page) => [...container, ...page], []) || []

	useEffect(() => {
		if (isFetching) return
		if (!hasNextPage) return
		if (flatten.length > 0) return
		fetchNextPage()
	}, [flatten])

	const lastElementRef = useCallback(
		node => {
			if (isFetching) return
			if (observer.current) observer.current.disconnect()
			observer.current = new IntersectionObserver(entries => {
				if (entries[0].isIntersecting && hasNextPage) {
					fetchNextPage()
				}
			})
			if (node) observer.current.observe(node)
		},
		[observer, isFetching, hasNextPage],
	)

	return (
		<>
			<TokenInfo />
			<SlideUpPanel name="Activity">
				<ScrollArea>
					<Box
						css={{
							'> div:first-child': {
								'> div': {
									borderTop: 'none',
								},
							},
						}}
					>
						{flatten.map(({ t, a }: any, i) => (
							<ActivityItem
								key={i}
								ref={data.pages.length === i + 1 ? lastElementRef : null}
								tx={t}
								activity={a}
								css={{
									height: '76px',
									alignItems: 'center',
									width: '100%',
									borderTop: '1px solid $borderPanel',
									bg: '$bgPanel',
									mb: '0',
									br: '0',
									px: '$2',
								}}
							/>
						))}
					</Box>
				</ScrollArea>
				{error && <Text>Error: {(error as any)?.message}</Text>}
			</SlideUpPanel>
		</>
	)
}
