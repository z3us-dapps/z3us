/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react'
import { useNoneSharedStore } from '@src/hooks/use-store'
import { useAllAccountsTokenBalances, useTokenBalances } from '@src/hooks/react-query/queries/radix'
import { TokenLoadingRows } from '@src/components/token-loading-row'
import { useImmer } from 'use-immer'
import BigNumber from 'bignumber.js'
import { ToolTip } from 'ui/src/components/tool-tip'
import { VisibleFadeAnimation } from '@src/components/visible-fade-animation'
import { TokenListSettingsModal } from '@src/components/token-list-settings-modal'
import { RowsIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Virtuoso } from 'react-virtuoso'
import { ScrollArea } from 'ui/src/components/scroll-area'
import { SearchBox } from '@src/components/search-box'
import { NoResultsPlaceholder } from '@src/components/no-results-placeholder'
import Button from 'ui/src/components/button'
import { SLIDE_PANEL_HEIGHT, SLIDE_PANEL_EXPAND_HEIGHT, SLIDE_PANEL_HEADER_HEIGHT } from '@src/config'
import { Box, Text, Flex } from 'ui/src/components/atoms'
import { VisibleToken, VisibleTokens } from '@src/types'
import { AccountSwitcher } from '../account-switcher'
import { SlideUpPanel } from '../slide-up-panel'
import { TokenRow } from '../token-row'

interface SProps {
	isSearching: boolean
	onSearch: (search: string) => void
	onCancelSearch: () => void
	onToggleSearch: () => void
}

const SlideUpHeader: React.FC<SProps> = ({ isSearching, onSearch, onCancelSearch, onToggleSearch }) => (
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
			{isSearching ? (
				<SearchBox
					onSearch={onSearch}
					onCancelSearch={onCancelSearch}
					showCancelButton
					placeholder="Search tokens"
					focusOnMount
					css={{ position: 'absolute', top: '-21px', left: '14px', width: '332px', zIndex: '3' }}
				/>
			) : null}
		</Box>
		<Flex css={{ position: 'absolute', top: '24px', right: '12px', zIndex: '2' }}>
			<VisibleFadeAnimation isVisible={!isSearching}>
				<ToolTip message="Search tokens" side="top">
					<Button iconOnly size="2" color="ghost" onClick={onToggleSearch}>
						<MagnifyingGlassIcon />
					</Button>
				</ToolTip>
			</VisibleFadeAnimation>
			<TokenListSettingsModal toolTipSide="top" toolTipSideOffset={3} toolTipMessage="Edit token list">
				<Button iconOnly size="2" color="ghost" onClick={onCancelSearch}>
					<RowsIcon />
				</Button>
			</TokenListSettingsModal>
		</Flex>
	</>
)

const zero = new BigNumber(0)

const buildTokensForDisplay = (
	visibleTokens: VisibleTokens,
	hiddenTokens: VisibleTokens,
	balances: {
		[rri: string]: VisibleToken & { amount: BigNumber }
	},
): (VisibleToken & { amount: BigNumber })[] => {
	const values = Object.values(visibleTokens)
	const vs = values.reduce((obj, visibleToken: VisibleToken) => {
		obj[visibleToken.rri] = {
			amount: zero,
			...visibleToken,
			...balances[visibleToken.rri],
		}
		return obj
	}, {})

	Object.values(balances)
		.filter((visibleToken: VisibleToken) => !hiddenTokens[visibleToken.rri])
		.forEach(token => {
			if (vs[token.rri]) return
			vs[token.rri] = token
		})

	return Object.values(vs)
}

const AllBalances: React.FC = () => {
	const { visibleTokens, hiddenTokens, tokenSearch } = useNoneSharedStore(state => ({
		visibleTokens: state.visibleTokens,
		hiddenTokens: state.hiddenTokens,
		tokenSearch: state.tokenSearch,
	}))
	const [customScrollParent, setCustomScrollParent] = useState<HTMLElement | null>(null)
	const { balances, staked } = useAllAccountsTokenBalances()
	const hasLiquidBalances = Object.keys(balances).length > 0

	if (!hasLiquidBalances) {
		return (
			<Box css={{ p: '$4' }}>
				<Text medium size="4">
					No tokens in any of the accounts.
				</Text>
			</Box>
		)
	}

	const tokenData = buildTokensForDisplay(visibleTokens, hiddenTokens, balances)
	const searchedTokens = tokenData.filter(_token => {
		const searchTerm = tokenSearch?.toLowerCase() || ''
		const tokenName = _token?.name?.toLowerCase() || ''
		const tokenSymbol = _token?.symbol?.toLowerCase() || ''
		return tokenName?.includes(searchTerm) || tokenSymbol?.includes(searchTerm)
	})
	const hasSearchResults = searchedTokens?.length > 0

	let list = (
		<Box css={{ p: '$5' }}>
			<Text size="4">All accounts are empty.</Text>
		</Box>
	)

	if (hasLiquidBalances && hasSearchResults) {
		list = (
			<ScrollArea scrollableNodeProps={{ ref: setCustomScrollParent }}>
				<Virtuoso
					customScrollParent={customScrollParent}
					totalCount={searchedTokens.length}
					data={searchedTokens}
					itemContent={(i, { rri, amount, symbol }) => (
						<TokenRow
							i={i}
							key={rri}
							rri={rri}
							amount={amount}
							staked={symbol === 'xrd' && staked ? staked : null}
							symbol={symbol}
							disableClick
						/>
					)}
				/>
			</ScrollArea>
		)
	} else if (hasLiquidBalances) {
		list = <NoResultsPlaceholder title="No tokens found" />
	}

	return list
}

const AccountBalances: React.FC = () => {
	const { visibleTokens, hiddenTokens, tokenSearch } = useNoneSharedStore(state => ({
		visibleTokens: state.visibleTokens,
		hiddenTokens: state.hiddenTokens,
		tokenSearch: state.tokenSearch,
	}))
	const [customScrollParent, setCustomScrollParent] = useState<HTMLElement | null>(null)
	const { isLoading = true, data } = useTokenBalances()
	const liquidBalances = data?.account_balances?.liquid_balances || []
	const staked = data?.account_balances?.staked_and_unstaking_balance.value
	const hasLiquidBalances = liquidBalances.length > 0

	const balances = liquidBalances.reduce((obj, balance) => {
		obj[balance.rri] = balance
		return obj
	}, {})

	const tokenData = buildTokensForDisplay(visibleTokens, hiddenTokens, balances)
	const searchedTokens = tokenData.filter(_token => {
		const searchTerm = tokenSearch?.toLowerCase() || ''
		const tokenName = _token?.name?.toLowerCase() || ''
		const tokenSymbol = _token?.symbol?.toLowerCase() || ''
		return tokenName?.includes(searchTerm) || tokenSymbol?.includes(searchTerm)
	})
	const hasSearchResults = searchedTokens?.length > 0

	let list = (
		<Box css={{ p: '$5' }}>
			<Text size="4">Account has no token balances.</Text>
		</Box>
	)

	if (hasLiquidBalances && hasSearchResults) {
		list = (
			<ScrollArea scrollableNodeProps={{ ref: setCustomScrollParent }}>
				<Virtuoso
					customScrollParent={customScrollParent}
					totalCount={searchedTokens.length}
					data={searchedTokens}
					itemContent={(i, { rri, amount, symbol }) => (
						<TokenRow
							i={i}
							key={rri}
							rri={rri}
							amount={amount}
							staked={symbol === 'xrd' && staked ? staked : null}
							symbol={symbol}
							loading={isLoading}
						/>
					)}
				/>
			</ScrollArea>
		)
	} else if (hasLiquidBalances) {
		list = <NoResultsPlaceholder title="No tokens found" />
	}

	return isLoading ? <TokenLoadingRows /> : list
}

const Balances: React.FC = () => {
	const { activeSlideIndex, expanded } = useNoneSharedStore(state => ({
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

interface ImmerT {
	isSearching: boolean
}

export const TokenList: React.FC = () => {
	const { addresses, activeSlideIndex } = useNoneSharedStore(state => ({
		addresses: Object.values(state.publicAddresses).map(({ address }) => address),
		activeSlideIndex: state.activeSlideIndex,
	}))
	const { setTokenSearch } = useNoneSharedStore(state => ({
		setTokenSearch: state.setTokenSearchAction,
	}))
	const [state, setState] = useImmer<ImmerT>({
		isSearching: false,
	})

	const isSlideUpPanelVisible = activeSlideIndex < addresses.length

	const handleSearchTokenList = (search: string) => {
		setTokenSearch(search)
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

	return (
		<>
			<AccountSwitcher />
			<Box
				css={{
					pe: isSlideUpPanelVisible ? 'auto' : 'none',
					opacity: isSlideUpPanelVisible ? '1' : '0',
					transition: !isSlideUpPanelVisible ? '$default' : 'unset',
				}}
			>
				<SlideUpPanel
					headerComponent={
						<SlideUpHeader
							isSearching={state.isSearching}
							onSearch={handleSearchTokenList}
							onCancelSearch={handleCancelSearch}
							onToggleSearch={handleToggleSearch}
						/>
					}
				>
					<Balances />
				</SlideUpPanel>
			</Box>
		</>
	)
}

export default TokenList
