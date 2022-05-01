import React, { useRef, useCallback, useEffect, useState } from 'react'
import { useStore } from '@src/store'
import { ScrollArea } from '@src/components/scroll-area'
import { useTransactionHistory } from '@src/services/react-query/queries/radix'
import { ActivityItem } from '@src/components/activity-item'
import { useRoute } from 'wouter'
import { Text, Box } from 'ui/src/components/atoms'

import { Virtuoso } from 'react-virtuoso'
import { getSplitParams } from '@src/utils/url-utils'
import {
	SLIDE_PANEL_HEIGHT,
	SLIDE_PANEL_EXPAND_HEIGHT,
	SLIDE_PANEL_HEADER_HEIGHT,
} from '@src/containers/wallet-panel/config'
import { SlideUpPanel } from '../slide-up-panel'
import { TokenInfo } from '../token-info'

export const Token: React.FC = () => {
	const { expanded } = useStore(state => ({
		expanded: state.accountPanelExpanded,
	}))
	const [customScrollParent, setCustomScrollParent] = useState(null)
	const [, params] = useRoute('/account/token/:rri')
	const rri = getSplitParams(params)
	const observer = useRef<IntersectionObserver | null>(null)
	const { isFetching, data, error, fetchNextPage, hasNextPage } = useTransactionHistory(10)

	const calculateHeight = expanded
		? SLIDE_PANEL_EXPAND_HEIGHT - SLIDE_PANEL_HEADER_HEIGHT
		: SLIDE_PANEL_HEIGHT - SLIDE_PANEL_HEADER_HEIGHT

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
				<Box css={{ position: 'relative', height: `${calculateHeight}px` }}>
					<ScrollArea scrollableNodeProps={{ ref: setCustomScrollParent }}>
						<Virtuoso
							customScrollParent={customScrollParent}
							totalCount={flatten.length}
							data={flatten}
							// eslint-disable-next-line react/no-unstable-nested-components
							itemContent={(i, { a, t }) => (
								<ActivityItem
									ref={data.pages.length === i + 1 ? lastElementRef : null}
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
				</Box>

				{/*@TODO: clean this error state*/}
				{error && <Text>Error: {(error as any)?.message}</Text>}
			</SlideUpPanel>
		</>
	)
}
