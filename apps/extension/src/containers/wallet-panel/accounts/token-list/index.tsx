/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useRef } from 'react'
import { useSharedStore, useStore } from '@src/store'
import { useAllAccountsTokenBalances, useTokenBalances } from '@src/services/react-query/queries/radix'
import { TokenLoadingRows } from '@src/components/token-loading-row'
import { useImmer } from 'use-immer'
import { ToolTip } from 'ui/src/components/tool-tip'
import { VisibleFadeAnimation } from '@src/components/visible-fade-animation'
import { TokenListSettingsModal } from '@src/components/token-list-settings-modal'
import { RowsIcon, MagnifyingGlassIcon, Cross2Icon } from '@radix-ui/react-icons'
import { Virtuoso } from 'react-virtuoso'
import { ScrollArea } from '@src/components/scroll-area'
import { SearchBox } from '@src/components/search-box'
import Button from 'ui/src/components/button'
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

	return isLoading ? <TokenLoadingRows /> : list
}

const Balances: React.FC = () => {
	const { expanded } = useSharedStore(state => ({
		expanded: state.accountPanelExpanded,
	}))
	const { activeSlideIndex } = useStore(state => ({
		activeSlideIndex: state.activeSlideIndex,
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

export const TokenList: React.FC = () => {
	const { addresses, activeSlideIndex } = useStore(state => ({
		addresses: Object.values(state.publicAddresses).map(({ address }) => address),
		activeSlideIndex: state.activeSlideIndex,
	}))
	const [state, setState] = useImmer({
		isSearching: false,
	})

	const isSlideUpPanelVisible = activeSlideIndex < addresses.length

	const handleSearchTokenList = (search: string) => {
		// eslint-disable-next-line
		console.log('search:', search)
	}

	const handleToggleSearch = () => {
		setState(draft => {
			draft.isSearching = true
		})
	}

	const handleCancelSearch = () => {
		setState(draft => {
			draft.isSearching = false
		})
	}

	const slideUpHeader = (
		<>
			<Box
				css={{
					px: '$4',
					height: '30px',
					borderBottom: '1px solid $borderPanel',
					mt: '-10px',
					position: 'relative',
				}}
			>
				<Text bold css={{ fontSize: '20px', lineHeight: '20px', transform: 'translateY(-6px)' }}>
					Tokens
				</Text>
				{state.isSearching ? (
					<SearchBox
						onSearch={handleSearchTokenList}
						onCancelSearch={handleCancelSearch}
						placeholder="Search tokens"
						css={{ position: 'absolute', top: '-22px', left: '14px', width: '298px', zIndex: '2' }}
					/>
				) : null}
			</Box>
			<Flex css={{ position: 'absolute', top: '22px', right: '12px', zIndex: '2', gap: '4px' }}>
				<VisibleFadeAnimation isVisible={!state.isSearching}>
					<ToolTip message="Search tokens" side="top">
						<Button iconOnly size="1" color="ghost" onClick={handleToggleSearch}>
							<MagnifyingGlassIcon />
						</Button>
					</ToolTip>
				</VisibleFadeAnimation>
				<TokenListSettingsModal toolTipSide="top" toolTipSideOffset={3} toolTipMessage="Edit token list">
					<Button iconOnly size="1" color="ghost" onClick={handleCancelSearch}>
						<RowsIcon />
					</Button>
				</TokenListSettingsModal>
			</Flex>
		</>
	)

	return (
		<>
			<AccountSwitcher />
			<VisibleFadeAnimation isVisible={isSlideUpPanelVisible}>
				<SlideUpPanel headerComponent={slideUpHeader}>
					<Balances />
				</SlideUpPanel>
			</VisibleFadeAnimation>
		</>
	)
}
