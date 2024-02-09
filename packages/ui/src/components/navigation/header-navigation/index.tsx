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
import { NavLink } from 'ui/src/components/router-link'
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
import { useMenuItems } from '../use-menu-items'
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

const Z3USLogoLink = () => {
	const navigate = useNavigate()

	const handleZ3USLogoClick = () => {
		const currentURL = window.location.href
		const isZ3USDomain = window.location.hostname === 'z3us.com'
		const newURL = currentURL.split('#')[0]

		if (isZ3USDomain) {
			window.location.href = newURL
		} else {
			navigate('/accounts')
		}
	}

	return (
		<Box component="button" onClick={handleZ3USLogoClick}>
			<Z3usLogo />
		</Box>
	)
}
const HeaderLavaMenu = () => {
	const items = useMenuItems()
	return (
		<Box component="ul" className={styles.lavaNavigationMenu}>
			<LayoutGroup id="accounts-menu">
				{items.map(({ text, href }) => (
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
	const [searchParams] = useSearchParams()

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
			navigate(`${location.pathname}?${searchParams}`)
		} else {
			searchParams.delete('tx')
			searchParams.set('query', `${value}`)
			navigate(`${location.pathname}?${searchParams}`)
		}
	}

	const handleClickSearch = (_visible: boolean) => {
		setIsSearchVisible(_visible)
	}

	return (
		<Box className={styles.headerInnerNavWrapper}>
			{canGoBack ? (
				<>
					<Box className={styles.headerMobileHiddenWrapper}>
						<Z3USLogoLink />
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
					<Z3USLogoLink />
					<HeaderLavaMenu />
					<Box className={styles.tabletHiddenWrapper}>
						{isAccountsPath && !isSearchVisible && (
							<>
								<SelectSimple
									dropDownWidth={220}
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
									<Button styleVariant="ghost" sizeVariant="small" iconOnly>
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
