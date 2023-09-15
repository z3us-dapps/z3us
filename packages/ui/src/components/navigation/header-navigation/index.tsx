import clsx from 'clsx'
import { LayoutGroup } from 'framer-motion'
import { t } from 'i18next'
import React from 'react'
import { useLocation, useMatches, useNavigate, useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { ConnectButton } from 'ui/src/components/connect-button'
import { CopyAddressButton } from 'ui/src/components/copy-address-button'
import { SearchIcon } from 'ui/src/components/icons'
import { PillNavigation } from 'ui/src/components/pill-navigation'
import { Button } from 'ui/src/components/router-button'
import { Link, NavLink } from 'ui/src/components/router-link'
import { SelectSimple } from 'ui/src/components/select'
import * as containerStyles from 'ui/src/components/styles/container-styles.css'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Z3usLogo } from 'ui/src/components/z3us-logo-babylon'
import { useWalletAccounts } from 'ui/src/hooks/use-accounts'

import { AccountViewDropdown } from '../account-view-dropdown'
import * as styles from './styles.css'

const HeaderNavDesktop = () => {
	const { pathname } = useLocation()
	return (
		<Box className={styles.headerDesktopNavWrapper}>
			<Link to="/">
				<Z3usLogo />
			</Link>
			<Box component="ul" className={styles.navigationMenu}>
				<LayoutGroup id="accounts-menu">
					{[
						{ text: t('accounts.navigation.accounts'), href: '/accounts' },
						{ text: t('accounts.navigation.transfer'), href: '/transfer' },
						{ text: t('accounts.navigation.staking'), href: '/staking' },
						{ text: t('accounts.navigation.settings'), href: '/settings/general' },
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
				{/* TODO: search */}
				{/* <ToolTip message="global.search">
					<Button rounded styleVariant="ghost" sizeVariant="small" to={`${pathname}?query=hello&account=all`} iconOnly>
						<SearchIcon />
					</Button>
				</ToolTip> */}
				<AccountViewDropdown />
			</Box>
		</Box>
	)
}

const HeaderNavMobile = () => {
	const accounts = useWalletAccounts()
	const { accountId } = useParams()
	const matches = useMatches()
	const navigate = useNavigate()

	const accountMenuItems = [
		...[{ id: 'home', title: 'All' }],
		...Object.values(accounts).map(({ address, name }) => ({
			id: address,
			title: name,
		})),
	]

	const backButton = matches
		.filter(match => Boolean((match.handle as any)?.backButton))
		.map(match => (match.handle as any).backButton)
	const hasBackButton = backButton?.length > 0
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
			{hasBackButton ? (
				<>
					{backButton}
					<Box display="flex" marginLeft="small" justifyContent="center" alignItems="center" gap="xsmall" flexGrow={1}>
						<CopyAddressButton
							styleVariant="white-transparent"
							sizeVariant="small"
							name={accountName}
							address={accountAddress}
							rounded
							tickColor="colorStrong"
						/>
					</Box>
				</>
			) : (
				<>
					<Link to="/">
						<Z3usLogo />
					</Link>
					<Box marginLeft="small" display="flex" justifyContent="space-between" flexGrow={1} flexShrink={0}>
						<SelectSimple
							value={accountAddress || 'home'}
							onValueChange={handleSelectAccount}
							styleVariant="white-transparent"
							sizeVariant="small"
							rounded
							data={accountMenuItems}
						/>
					</Box>
					{accountAddress && (
						<CopyAddressButton
							styleVariant="white-transparent"
							sizeVariant="small"
							address={accountAddress}
							rounded
							tickColor="colorStrong"
						/>
					)}
				</>
			)}
		</Box>
	)
}

export const HeaderNav: React.FC = () => (
	<Box component="nav" className={clsx(styles.navigationWrapper, containerStyles.containerWrapper)}>
		<Box className={clsx(styles.navigationInnerWrapper, containerStyles.containerInnerWrapper)}>
			<HeaderNavMobile />
			<HeaderNavDesktop />
			<ConnectButton />
		</Box>
	</Box>
)
