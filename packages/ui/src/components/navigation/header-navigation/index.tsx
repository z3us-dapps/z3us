import clsx from 'clsx'
import { LayoutGroup } from 'framer-motion'
import React, { useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { ConnectButton } from 'ui/src/components/connect-button'
import { CopyAddressButton } from 'ui/src/components/copy-address-button'
import { PillNavigation } from 'ui/src/components/pill-navigation'
import { Link, NavLink } from 'ui/src/components/router-link'
import { SelectSimple } from 'ui/src/components/select'
import * as containerStyles from 'ui/src/components/styles/container-styles.css'
import { Z3usLogo } from 'ui/src/components/z3us-logo-babylon'
import { useWalletAccounts } from 'ui/src/hooks/use-accounts'
import { useIsAllAccounts } from 'ui/src/hooks/use-is-all-accounts'
import { useSharedStore } from 'ui/src/hooks/use-store'
import { BackButton } from 'ui/src/pages/accounts/components/layout/components/mobile/back-button'
import { KeystoreType } from 'ui/src/store/types'

import { AccountViewDropdown } from '../account-view-dropdown'
import * as styles from './styles.css'

const messages = defineMessages({
	all: {
		defaultMessage: 'All',
		id: 'zQvVDJ',
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
})

const HeaderNavDesktop = () => {
	const intl = useIntl()
	return (
		<Box className={styles.headerDesktopNavWrapper}>
			<Link to="/">
				<Z3usLogo />
			</Link>
			<Box component="ul" className={styles.navigationMenu}>
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
			<Box display="flex" alignItems="center" gap="small" flexGrow={1} paddingRight="medium" justifyContent="flex-end">
				<AccountViewDropdown />
			</Box>
		</Box>
	)
}

function removeLastPartOfURL(path: string): [boolean, string] {
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

const HeaderNavMobile = () => {
	const intl = useIntl()
	const accounts = useWalletAccounts()
	const { accountId } = useParams()
	const location = useLocation()
	const isAccountsPath = location?.pathname?.includes('/accounts')

	const navigate = useNavigate()
	const isAllAccounts = useIsAllAccounts()

	const accountMenuItems = [
		...[{ id: 'home', title: intl.formatMessage(messages.all) }],
		...Object.values(accounts).map(({ address, name }) => ({
			id: address,
			title: name,
		})),
	]

	const [canGoBack, backPath] = useMemo(() => removeLastPartOfURL(location.pathname), [location.pathname])
	const accountName = accounts?.[accountId]?.name
	const accountAddress = accounts?.[accountId]?.address

	const handleSelectAccount = (account: string) => {
		if (account === 'home') {
			navigate('/accounts')
		} else {
			navigate(`/accounts/${account}`)
		}
	}

	return (
		<Box className={styles.headerMobileNavWrapper}>
			{canGoBack ? (
				<>
					<BackButton key="nfts" to={backPath} styleVariant={isAllAccounts ? 'ghost' : 'white-transparent'} />
					<Box display="flex" marginLeft="small" justifyContent="center" alignItems="center" gap="xsmall" flexGrow={1}>
						{!isAllAccounts && (
							<CopyAddressButton
								styleVariant="white-transparent"
								sizeVariant="small"
								name={accountName}
								address={accountAddress}
								rounded
								tickColor="inherit"
							/>
						)}
					</Box>
				</>
			) : (
				<>
					<Link to="/">
						<Z3usLogo />
					</Link>
					<Box marginLeft="small" display="flex" justifyContent="space-between" flexGrow={1} flexShrink={0}>
						{isAccountsPath && (
							<SelectSimple
								value={accountAddress || 'home'}
								onValueChange={handleSelectAccount}
								styleVariant="ghost"
								sizeVariant="small"
								rounded
								data={accountMenuItems}
							/>
						)}
					</Box>
					{accountAddress && (
						<Box marginRight="xsmall">
							<CopyAddressButton
								styleVariant="white-transparent"
								sizeVariant="small"
								address={accountAddress}
								rounded
								tickColor="inherit"
							/>
						</Box>
					)}
				</>
			)}
			<AccountViewDropdown styleVariant={isAllAccounts ? 'ghost' : 'white-transparent'} />
		</Box>
	)
}

export const HeaderNav: React.FC = () => {
	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))

	return (
		<Box component="nav" className={clsx(styles.navigationWrapper, containerStyles.containerWrapper)}>
			<Box className={clsx(styles.navigationInnerWrapper, containerStyles.containerInnerWrapper)}>
				<HeaderNavMobile />
				<HeaderNavDesktop />
				{keystore?.type === KeystoreType.RADIX_WALLET && <ConnectButton />}
			</Box>
		</Box>
	)
}
