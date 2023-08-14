import clsx from 'clsx'
import { LayoutGroup } from 'framer-motion'
import { useNoneSharedStore } from 'packages/ui/src/hooks/use-store'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Box } from 'ui/src/components/box'
import { ConnectButton } from 'ui/src/components/connect-button'
import { CopyAddressButton } from 'ui/src/components/copy-address-button'
import { PillNavigation } from 'ui/src/components/pill-navigation'
import { Link, NavLink } from 'ui/src/components/router-link'
import * as containerStyles from 'ui/src/components/styles/container-styles.css'
import { Z3usLogo } from 'ui/src/components/z3us-logo-babylon'

import { AccountViewDropdown } from './account-view-dropdown'
import * as styles from './navigation.css'

const AccountDesktopLavaMenu = () => {
	const { t } = useTranslation()

	return (
		<Box component="ul" className={styles.navigationMenu}>
			<LayoutGroup id="accounts-menu">
				{[
					{ text: t('accounts.navigation.accounts'), href: '/accounts' },
					{ text: t('accounts.navigation.transfer'), href: '/transfer' },
					{ text: t('accounts.navigation.staking'), href: '/staking' },
					{ text: t('accounts.navigation.settings'), href: '/settings' },
				].map(({ text, href }) => (
					<Box component="li" key={href}>
						<NavLink to={href} underline="never">
							{({ isActive }) => <PillNavigation text={text} matchActiveFn={() => isActive} />}
						</NavLink>
					</Box>
				))}
			</LayoutGroup>
		</Box>
	)
}

const DesktopNavigation: React.FC = () => {
	const { selectedAccount } = useNoneSharedStore(state => ({
		selectedAccount: state.selectedAccount,
	}))

	return (
		<Box component="nav" className={clsx(styles.navigationWrapper, containerStyles.containerWrapper)}>
			<Box className={clsx(styles.navigationInnerWrapper, containerStyles.containerInnerWrapper)}>
				<Link to="/">
					<Z3usLogo />
				</Link>
				<AccountDesktopLavaMenu />
				<Box display="flex" alignItems="center" gap="medium" flexGrow={1} justifyContent="flex-end">
					<CopyAddressButton address={selectedAccount} />
					<AccountViewDropdown />
					<ConnectButton />
				</Box>
			</Box>
		</Box>
	)
}

export default DesktopNavigation
