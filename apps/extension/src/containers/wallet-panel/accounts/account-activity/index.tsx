/* eslint-disable  react/no-unstable-nested-components */
import React, { useCallback, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'

import { Box, Flex, Text } from 'ui/src/components/atoms'
import LoaderBars from 'ui/src/components/loader-bars'
import { ScrollArea } from 'ui/src/components/scroll-area'

import { AccountSelector } from '@src/components/account-selector'
import { ActivityItem } from '@src/components/activity-item'
import { NoResultsPlaceholder } from '@src/components/no-results-placeholder'
import { SendReceiveHeader } from '@src/components/send-receive-header'
import { useTransactionHistory } from '@src/hooks/react-query/queries/radix'
import { useNoneSharedStore } from '@src/hooks/use-store'
import { getShortAddress } from '@src/utils/string-utils'

export const AccountActivity: React.FC = () => {
	const [customScrollParent, setCustomScrollParent] = useState<HTMLElement | null>(null)
	const { accountAddress, selectAccount } = useNoneSharedStore(state => ({
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
		await selectAccount(accountIndex)
	}

	const loadMore = useCallback(() => {
		if (isFetching) return
		if (hasNextPage) {
			fetchNextPage()
		}
	}, [isFetching, fetchNextPage, hasNextPage])

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
						{isFetching && !hasActivities ? (
							<Flex justify="center" css={{ width: '100%', mt: '$4' }}>
								<LoaderBars />
							</Flex>
						) : null}
						{!isFetching && !hasActivities ? (
							<Flex justify="center" css={{ width: '100%', mt: '$4' }}>
								<NoResultsPlaceholder
									title="No account activity"
									subTitle="account transactions will be displayed here"
									showIcon={false}
								/>
							</Flex>
						) : null}
						{hasActivities ? (
							<Virtuoso
								customScrollParent={customScrollParent}
								totalCount={flatten.length}
								data={flatten}
								endReached={loadMore}
								// eslint-disable-next-line react/no-unstable-nested-components
								itemContent={(i, { a, t }) => (
									<ActivityItem
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
						) : null}
					</Box>
				</ScrollArea>
			</Box>
		</Flex>
	)
}

export default AccountActivity
