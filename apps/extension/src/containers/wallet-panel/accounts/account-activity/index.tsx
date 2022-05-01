/* eslint-disable react/no-array-index-key, react/no-unstable-nested-components */
import React, { useRef, useCallback, useState } from 'react'
import { useStore } from '@src/store'
import { useTransactionHistory } from '@src/services/react-query/queries/radix'
import { getShortAddress } from '@src/utils/string-utils'
import { AccountSelector } from '@src/components/account-selector'
import { Virtuoso } from 'react-virtuoso'
import { ScrollArea } from '@src/components/scroll-area'
import { ActivityItem } from '@src/components/activity-item'
import { Box, Text, Flex } from 'ui/src/components/atoms'
import { SendReceiveHeader } from '../send-receive-header'

export const AccountActivity: React.FC = () => {
	const [customScrollParent, setCustomScrollParent] = useState(null)
	const observer = useRef<IntersectionObserver | null>(null)

	const { accountAddress, selectAccount } = useStore(state => ({
		accountAddress: state.getCurrentAddressAction(),
		selectAccount: state.selectAccountAction,
	}))
	const { isFetching, data, error, fetchNextPage, hasNextPage } = useTransactionHistory()

	const shortAddress = getShortAddress(accountAddress)

	const flatten =
		data?.pages
			.map(page =>
				page.transactions
					.filter(t => t.actions.length > 0)
					.reduce((container, t) => [...container, ...t.actions.map(a => ({ t, a }))], []),
			)
			.reduce((container, page) => [...container, ...page], []) || []

	const handleAccountChange = async (accountIndex: number) => {
		await selectAccount(accountIndex)
	}

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
		<Flex
			direction="column"
			css={{
				bg: '$bgPanel',
				height: '545px',
				position: 'absolute',
				zIndex: '1',
				left: '0',
				right: '0',
				bottom: '55px',
			}}
		>
			<SendReceiveHeader backLocation="/account" />
			<Box css={{ position: 'relative', height: '497px' }}>
				<ScrollArea scrollableNodeProps={{ ref: setCustomScrollParent }}>
					<Box css={{ p: '23px', pt: '20px' }}>
						<Text css={{ fontSize: '32px', lineHeight: '38px', fontWeight: '800' }}>Account activity</Text>
						<Text css={{ fontSize: '14px', lineHeight: '17px', fontWeight: '500', mt: '20px' }}>
							Account selected:
							{error && (
								<Text color="red">
									<br />
									Error: {(error as any)?.message}
								</Text>
							)}
						</Text>
						<Box css={{ pb: '12px' }}>
							<AccountSelector shortAddress={shortAddress} onAccountChange={handleAccountChange} />
						</Box>
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
									isIsoStyled
									css={{
										height: '68px',
										alignItems: 'center',
										width: '100%',
										border: '1px solid $borderPanel',
										bg: '$bgPanel2',
										br: '$3',
										pr: '$2',
										pl: '0',
										display: 'flex',
										textAlign: 'left',
										'&:hover': {
											background: '$bgPanelHover',
										},
									}}
								/>
							)}
						/>
					</Box>
				</ScrollArea>
			</Box>
		</Flex>
	)
}
