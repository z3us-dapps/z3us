import React from 'react'
import { useStore } from '@src/store'
import { useAllAccountsTokenBalances, useTokenBalances } from '@src/services/react-query/queries/radix'
import { TokenLoadingRow } from '@src/components/token-loading-row'
import { Box, Text, Flex } from 'ui/src/components/atoms'
import { AccountSwitcher } from '../account-switcher'
import { SlideUpPanel } from '../slide-up-panel'
import { TokenRow } from '../token-row'

const AllBalances: React.FC = () => {
	const liquidBalances = useAllAccountsTokenBalances()
	const hasLiquidBalances = liquidBalances.length > 0

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
		liquidBalances.map(({ rri, amount }) => <TokenRow key={rri} rri={rri} amount={amount} disableClick />)
	) : (
		<Box css={{ p: '$5' }}>
			<Text size="4">All accounts are empty.</Text>
		</Box>
	)

	return <Box>{list}</Box>
}

const AccountBalances: React.FC = () => {
	const { isLoading = true, data: balances } = useTokenBalances()
	const liquidBalances = balances?.account_balances?.liquid_balances || []
	const hasLiquidBalances = liquidBalances.length > 0

	if (!isLoading && !balances) {
		return (
			<Box css={{ p: '$4' }}>
				<Text medium size="4">
					No tokens in account.
				</Text>
			</Box>
		)
	}

	const list = hasLiquidBalances ? (
		liquidBalances.map(({ rri, amount }) => <TokenRow key={rri} rri={rri} amount={amount} loading={isLoading} />)
	) : (
		<Box css={{ p: '$5' }}>
			<Text size="4">Account has no token balances.</Text>
		</Box>
	)

	return (
		<Box>
			{isLoading ? (
				<Flex direction="column" align="center" justify="start" css={{ height: '140px', px: '$4', pt: '$4' }}>
					<TokenLoadingRow />
					<TokenLoadingRow />
				</Flex>
			) : (
				list
			)}
		</Box>
	)
}

const Balances: React.FC = () => {
	const { activeSlideIndex } = useStore(state => ({
		activeSlideIndex: state.activeSlideIndex,
	}))

	return activeSlideIndex === -1 ? <AllBalances /> : <AccountBalances />
}

export const TokenList: React.FC = () => (
	<>
		<AccountSwitcher />
		<SlideUpPanel name="Tokens">
			<Balances />
		</SlideUpPanel>
	</>
)
