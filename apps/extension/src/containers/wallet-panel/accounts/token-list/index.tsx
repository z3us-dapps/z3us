/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react'
import { useStore } from '@src/store'
import { useAllAccountsTokenBalances, useTokenBalances } from '@src/services/react-query/queries/radix'
import { TokenLoadingRow } from '@src/components/token-loading-row'
import { Virtuoso } from 'react-virtuoso'
import { ScrollArea } from '@src/components/scroll-area'
import { SLIDE_PANEL_HEIGHT, SLIDE_PANEL_EXPAND_HEIGHT, SLIDE_PANEL_HEADER_HEIGHT } from '@src/config'
import { Box, Text, Flex } from 'ui/src/components/atoms'
import { AccountSwitcher } from '../account-switcher'
import { SlideUpPanel } from '../slide-up-panel'
import { TokenRow } from '../token-row'

const AllBalances: React.FC = () => {
	const [customScrollParent, setCustomScrollParent] = useState(null)
	const { balances, staked } = useAllAccountsTokenBalances()
	const hasLiquidBalances = balances.length > 0

	if (!hasLiquidBalances) {
		return (
			<Box css={{ p: '$4' }}>
				<Text medium size="4">
					No tokens in any of the accounts.
				</Text>
			</Box>
		)
	}

	const list = hasLiquidBalances ? (
		<ScrollArea scrollableNodeProps={{ ref: setCustomScrollParent }}>
			<Virtuoso
				customScrollParent={customScrollParent}
				totalCount={balances.length}
				data={balances}
				itemContent={(i, { rri, amount, symbol }) => (
					<TokenRow
						i={i}
						key={rri}
						rri={rri}
						amount={amount}
						staked={symbol === 'xrd' && staked ? staked : null}
						disableClick
					/>
				)}
			/>
		</ScrollArea>
	) : (
		<Box css={{ p: '$5' }}>
			<Text size="4">All accounts are empty.</Text>
		</Box>
	)

	return <Box>{list}</Box>
}

const AccountBalances: React.FC = () => {
	const [customScrollParent, setCustomScrollParent] = useState(null)
	const { isLoading = true, data } = useTokenBalances()
	const liquidBalances = data?.account_balances?.liquid_balances || []
	const staked = data?.account_balances?.staked_and_unstaking_balance.value
	const hasLiquidBalances = liquidBalances.length > 0

	const list = hasLiquidBalances ? (
		<ScrollArea scrollableNodeProps={{ ref: setCustomScrollParent }}>
			<Virtuoso
				customScrollParent={customScrollParent}
				totalCount={liquidBalances.length}
				data={liquidBalances}
				itemContent={(i, { rri, amount, symbol }) => (
					<TokenRow
						i={i}
						key={rri}
						rri={rri}
						amount={amount}
						staked={symbol === 'xrd' && staked ? staked : null}
						loading={isLoading}
					/>
				)}
			/>
		</ScrollArea>
	) : (
		<Box css={{ p: '$5' }}>
			<Text size="4">Account has no token balances.</Text>
		</Box>
	)

	return isLoading ? (
		<Flex direction="column" align="center" justify="start" css={{ height: '140px' }}>
			<Flex
				css={{
					height: '68px',
					width: '100%',
					background: '$bgPanel',
					px: '$4',
				}}
			>
				<Flex align="center" justify="center" css={{ width: '100%' }}>
					<TokenLoadingRow />
				</Flex>
			</Flex>
			<Flex
				css={{
					height: '68px',
					width: '100%',
					borderTop: '1px solid $borderPanel',
					background: '$bgPanel',
					px: '$4',
				}}
			>
				<Flex align="center" justify="center" css={{ width: '100%' }}>
					<TokenLoadingRow />
				</Flex>
			</Flex>
		</Flex>
	) : (
		list
	)
}

const Balances: React.FC = () => {
	const { activeSlideIndex, expanded } = useStore(state => ({
		activeSlideIndex: state.activeSlideIndex,
		expanded: state.accountPanelExpanded,
	}))

	const calculateHeight = expanded
		? SLIDE_PANEL_EXPAND_HEIGHT - SLIDE_PANEL_HEADER_HEIGHT
		: SLIDE_PANEL_HEIGHT - SLIDE_PANEL_HEADER_HEIGHT

	return (
		<Box css={{ position: 'relative', height: `${calculateHeight}px` }}>
			{activeSlideIndex === -1 ? <AllBalances /> : <AccountBalances />}
		</Box>
	)
}

export const TokenList: React.FC = () => (
	<>
		<AccountSwitcher />
		<SlideUpPanel name="Tokens">
			<Balances />
		</SlideUpPanel>
	</>
)
