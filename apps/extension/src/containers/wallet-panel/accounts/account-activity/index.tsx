/* eslint-disable react/no-array-index-key, react/no-unstable-nested-components */
import React, { useRef, useCallback, useState } from 'react'
import { useSharedStore, useAccountStore } from '@src/hooks/use-store'
import { useTransactionHistory } from '@src/hooks/react-query/queries/radix'
import { getShortAddress } from '@src/utils/string-utils'
import { AccountSelector } from '@src/components/account-selector'
import { Virtuoso } from 'react-virtuoso'
import { ScrollArea } from 'ui/src/components/scroll-area'
import { ActivityItem } from '@src/components/activity-item'
import { Box, Text, Flex } from 'ui/src/components/atoms'
import LoaderBars from 'ui/src/components/loader-bars'
import { SendReceiveHeader } from '@src/components/send-receive-header'

export const AccountActivity: React.FC = () => {
	const [customScrollParent, setCustomScrollParent] = useState<HTMLElement | null>(null)
	const observer = useRef<IntersectionObserver | null>(null)
	const { hw, seed } = useSharedStore(state => ({
		hw: state.hardwareWallet,
		seed: state.masterSeed,
	}))
	const { accountAddress, selectAccount } = useAccountStore(state => ({
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

	const hasActivities = flatten.length > 0

	const handleAccountChange = async (accountIndex: number) => {
		await selectAccount(accountIndex, hw, seed)
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
						{hasActivities ? (
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
						) : (
							<Flex justify="center" css={{ width: '100%', mt: '$4' }}>
								<LoaderBars />
							</Flex>
						)}
					</Box>
				</ScrollArea>
			</Box>
		</Flex>
	)
}
