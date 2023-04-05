import React, { useCallback, useEffect, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'
import { useRoute } from 'wouter'

import { Box, Text } from 'ui/src/components/atoms'
import { ScrollArea } from 'ui/src/components/scroll-area'

import { ActivityItem } from '@src/components/activity-item'
import { TokenLoadingRows } from '@src/components/token-loading-row'
import { useTransactionHistory } from '@src/hooks/react-query/queries/radix'
import { getSplitParams } from '@src/utils/url-utils'

import { SlideUpPanel } from '../slide-up-panel'
import { TokenInfo } from '../token-info'

export const VirtuosoFooter = (): JSX.Element => (
	<div
		style={{
			padding: '2rem',
			display: 'flex',
			justifyContent: 'center',
		}}
	>
		Loading...
	</div>
)

const SlideUpHeader: React.FC = () => (
	<Box
		css={{
			px: '$4',
			height: '30px',
			borderBottom: '1px solid $borderPanel',
			mt: '-10px',
		}}
	>
		<Text bold css={{ fontSize: '20px', lineHeight: '20px', transform: 'translateY(-6px)' }}>
			Activity
		</Text>
	</Box>
)

export const Token: React.FC = () => {
	const [customScrollParent, setCustomScrollParent] = useState<HTMLElement | null>(null)
	const [, params] = useRoute('/account/token/:rri')
	const rri = getSplitParams(params)
	const { isFetching, data, error, fetchNextPage, hasNextPage } = useTransactionHistory(10)

	// @TODO: implement `isLoading`
	const isLoading = false

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

	const loadMore = useCallback(() => {
		fetchNextPage()
	}, [fetchNextPage, hasNextPage])

	return (
		<>
			<TokenInfo />
			<SlideUpPanel slidePanelHeight={97} headerComponent={<SlideUpHeader />}>
				<Box css={{ position: 'relative', height: '100%' }}>
					{isLoading ? (
						<TokenLoadingRows />
					) : (
						<ScrollArea scrollableNodeProps={{ ref: setCustomScrollParent }}>
							<Virtuoso
								customScrollParent={customScrollParent}
								totalCount={flatten.length}
								data={flatten}
								endReached={loadMore}
								components={{ Footer: hasNextPage ? VirtuosoFooter : null }}
								// eslint-disable-next-line react/no-unstable-nested-components
								itemContent={(i, { a, t }) => (
									<ActivityItem
										tx={t}
										activity={a}
										css={{
											height: '68px',
											alignItems: 'center',
											width: '100%',
											borderTop: `1px solid ${i === 0 ? 'transparent' : '$borderPanel'}`,
											bg: '$bgPanel',
											br: '0',
											px: '$2',
											display: 'flex',
											textAlign: 'left',
											'&:hover': {
												background: '$bgPanelHover',
											},
										}}
									/>
								)}
							/>
						</ScrollArea>
					)}
				</Box>

				{/*@TODO: clean this error state*/}
				{error && <Text>Error: {(error as any)?.message}</Text>}
			</SlideUpPanel>
		</>
	)
}

export default Token
