import clsx from 'clsx'
import { LayoutGroup } from 'framer-motion'
import React, { useMemo, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { ConnectButton } from 'ui/src/components/connect-button'
import { CopyAddressButton } from 'ui/src/components/copy-address-button'
import { MenuIcon } from 'ui/src/components/icons'
import { PillNavigation } from 'ui/src/components/pill-navigation'
import { Link, NavLink } from 'ui/src/components/router-link'
import { SearchButtonInput } from 'ui/src/components/search-button-input'
import { SelectSimple } from 'ui/src/components/select'
import * as containerStyles from 'ui/src/components/styles/container-styles.css'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Z3usLogo } from 'ui/src/components/z3us-logo-babylon'
import { useWalletAccounts } from 'ui/src/hooks/use-accounts'
import { useDappStatus } from 'ui/src/hooks/use-dapp-status'
import { useIsAllAccounts } from 'ui/src/hooks/use-is-all-accounts'
import { useSharedStore } from 'ui/src/hooks/use-store'
import { AddAccountDialog } from 'ui/src/pages/accounts/components/layout/components/add-account-dialog'
import { BackButton } from 'ui/src/pages/accounts/components/layout/components/mobile/back-button'
import { KeystoreType } from 'ui/src/store/types'

import { AccountViewDropdown } from '../account-view-dropdown'
import * as styles from './styles.css'

const messages = defineMessages({
	all: {
		defaultMessage: 'All',
		id: 'zQvVDJ',
	},
	add_account: {
		defaultMessage: 'Add account',
		id: 'qJcduu',
	},
	accounts: {
		id: 'FvanT6',
		defaultMessage: 'Accounts',
	},
	transfer: {
		id: 'DtYelJ',
		defaultMessage: 'Transfer',
	},
	staking: {
		id: '+14VoL',
		defaultMessage: 'Staking',
	},
	settings: {
		id: 'D3idYv',
		defaultMessage: 'Settings',
	},
	searchToolTip: {
		defaultMessage: 'Search for a transaction ID, or an address for an account, or a resource',
		id: 'MYKtWJ',
	},
	searchPlaceholder: {
		defaultMessage: 'Search for a transaction ID, or an address for an account, or a resource',
		id: 'MYKtWJ',
	},

	menuTooltip: {
		defaultMessage: 'Menu',
		id: 'tKMlOc',
	},
})

const HeaderLavaMenu = () => {
	const intl = useIntl()
	return (
		<Box component="ul" className={styles.lavaNavigationMenu}>
			<LayoutGroup id="accounts-menu">
				{[
					{ text: intl.formatMessage(messages.accounts), href: '/accounts' },
					{ text: intl.formatMessage(messages.transfer), href: '/transfer' },
					// { text: intl.formatMessage(messages.staking), href: '/staking' },
					{ text: intl.formatMessage(messages.settings), href: '/settings' },
				].map(({ text, href }) => (
					<Box key={href} component="li">
						<NavLink to={href} underline="never">
							{({ isActive }) => <PillNavigation text={text} matchActiveFn={() => isActive} />}
						</NavLink>
					</Box>
				))}
			</LayoutGroup>
		</Box>
	)
}

const removeLastPartOfURL = (path: string): [boolean, string] => {
	if (!path || path === '/') {
		return [false, path]
	}

	const segments = path.split('/').filter(s => s !== '')
	if (segments.length > 1 && segments[segments.length - 1] === '-') {
		segments.pop()
	}
	const canGoBack = segments.length >= 2 && segments[0] !== 'interaction'
	segments.pop()
	return [canGoBack, segments.join('/')]
}

const HeaderNavInner = () => {
	const intl = useIntl()
	const accounts = useWalletAccounts()
	const { accountId, resourceId } = useParams()
	const isAllAccounts = useIsAllAccounts()

	const location = useLocation()
	const navigate = useNavigate()
	const [searchParams, setSearchParams] = useSearchParams()

	const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false)
	const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState<boolean>(false)
	const isAccountsPath = location?.pathname?.includes('/accounts')
	const isAccountBgVisible = accountId && accountId !== '-' && !resourceId
	const buttonVariant = isAccountBgVisible ? 'white-transparent' : 'ghost'

	const accountMenuItems = [
		...[{ id: 'home', title: intl.formatMessage(messages.all) }],
		...Object.values(accounts).map(({ address, name }) => ({
			id: address,
			title: name,
		})),
		...[{ id: 'add-account', title: intl.formatMessage(messages.add_account) }],
	]

	const [canGoBack, backPath] = useMemo(() => removeLastPartOfURL(location.pathname), [location.pathname])
	const accountName = accounts?.[accountId]?.name
	const accountAddress = accounts?.[accountId]?.address

	const handleCloseAddAccountDialog = () => {
		setIsAddAccountModalOpen(false)
	}

	const handleSelectAccount = (account: string) => {
		if (account === 'add-account') {
			setIsAddAccountModalOpen(true)
			return
		}
		if (account === 'home') {
			navigate(`/accounts?${searchParams}`)
		} else {
			navigate(`/accounts/${account}?${searchParams}`)
		}
	}

	const handleCommitSearch = (value: string) => {
		setIsSearchVisible(false)
		if (value.startsWith('account_')) {
			navigate(`/accounts/${value}`)
		} else if (value.startsWith('txid_')) {
			searchParams.delete('query')
			searchParams.set('tx', `${value}`)
		} else {
			searchParams.delete('tx')
			searchParams.set('query', `${value}`)
		}
		setSearchParams(searchParams)
	}

	const handleClickSearch = (_visible: boolean) => {
		setIsSearchVisible(_visible)
	}

	return (
		<Box className={styles.headerInnerNavWrapper}>
			{canGoBack ? (
				<>
					<Box className={styles.headerMobileHiddenWrapper}>
						<Link to="/accounts">
							<Z3usLogo />
						</Link>
					</Box>
					<HeaderLavaMenu />
					<Box className={clsx(styles.headerBackButtonWrapper, styles.tabletHiddenWrapper)}>
						<BackButton key="nfts" to={backPath} styleVariant={buttonVariant} />
						{!isAllAccounts && (
							<Box
								display="flex"
								marginLeft="small"
								justifyContent="center"
								alignItems="center"
								gap="xsmall"
								flexGrow={1}
							>
								<CopyAddressButton
									styleVariant={buttonVariant}
									sizeVariant="small"
									name={accountName}
									address={accountAddress}
									rounded
									tickColor="inherit"
								/>
							</Box>
						)}
					</Box>
				</>
			) : (
				<>
					<Link to="/accounts">
						<Z3usLogo />
					</Link>
					<HeaderLavaMenu />
					<Box className={styles.tabletHiddenWrapper}>
						{isAccountsPath && !isSearchVisible && (
							<>
								<SelectSimple
									value={accountAddress || 'home'}
									onValueChange={handleSelectAccount}
									styleVariant="ghost"
									sizeVariant="small"
									rounded
									data={accountMenuItems}
								/>
								<AddAccountDialog open={isAddAccountModalOpen} onClose={handleCloseAddAccountDialog} />
							</>
						)}
						{accountAddress && (
							<CopyAddressButton
								styleVariant="white-transparent"
								sizeVariant="small"
								address={accountAddress}
								rounded
								tickColor="inherit"
							/>
						)}
					</Box>
				</>
			)}
			<Box className={clsx(styles.searchWrapper, accountAddress && styles.headerMobileHiddenWrapper)}>
				<SearchButtonInput
					className={clsx(styles.searchComponentWrapper)}
					searchBtnToolTipMsg={intl.formatMessage(messages.searchToolTip)}
					inputPlaceholder={intl.formatMessage(messages.searchPlaceholder)}
					onCommitSearch={handleCommitSearch}
					onSearchVisible={handleClickSearch}
				/>
			</Box>
			<AccountViewDropdown
				trigger={
					<Box>
						<ToolTip message={intl.formatMessage(messages.menuTooltip)}>
							<Box>
								<Box className={styles.tabletHiddenWrapper}>
									<Button styleVariant={buttonVariant} sizeVariant="small" iconOnly>
										<MenuIcon />
									</Button>
								</Box>
								<Box className={styles.headerMobileHiddenWrapper}>
									<Button styleVariant={buttonVariant} sizeVariant="small" iconOnly>
										<MenuIcon />
									</Button>
								</Box>
							</Box>
						</ToolTip>
					</Box>
				}
			/>
		</Box>
	)
}

export const HeaderNav: React.FC = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const dappStatus = useDappStatus()
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const isDappStatusConnected = false
	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))

	// if (keystore?.type === KeystoreType.RADIX_WALLET && !isDappStatusConnected) {
	// 	return (
	// 		<Box>
	// 			<ConnectButton />
	// 		</Box>
	// 	)
	// }

	return (
		<Box component="nav" className={clsx(styles.navigationWrapper, containerStyles.containerWrapper)}>
			<Box className={clsx(styles.navigationInnerWrapper, containerStyles.containerInnerWrapper)}>
				<HeaderNavInner />
				{keystore?.type === KeystoreType.RADIX_WALLET && <ConnectButton />}
			</Box>
		</Box>
	)
}
