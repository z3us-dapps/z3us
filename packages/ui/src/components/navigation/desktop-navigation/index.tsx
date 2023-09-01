import clsx from 'clsx'
import { LayoutGroup } from 'framer-motion'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { ConnectButton } from 'ui/src/components/connect-button'
import { PillNavigation } from 'ui/src/components/pill-navigation'
import { Button } from 'ui/src/components/router-button'
import { Link, NavLink } from 'ui/src/components/router-link'
import * as containerStyles from 'ui/src/components/styles/container-styles.css'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Z3usLogo } from 'ui/src/components/z3us-logo-babylon'

import { SearchIcon } from '../../icons'
import { AccountViewDropdown } from '../account-view-dropdown'
import * as styles from './styles.css'

const AccountDesktopLavaMenu = () => {
	const { t } = useTranslation()

	return (
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
	)
}

const DesktopNavigation: React.FC = () => {
	const { pathname } = useLocation()
	return (
		<Box component="nav" className={clsx(styles.navigationWrapper, containerStyles.containerWrapper)}>
			<Box className={clsx(styles.navigationInnerWrapper, containerStyles.containerInnerWrapper)}>
				<Link to="/">
					<Z3usLogo />
				</Link>
				<AccountDesktopLavaMenu />
				<Box display="flex" alignItems="center" gap="small" flexGrow={1} justifyContent="flex-end">
					<ToolTip message="global.search">
						<Button
							rounded
							styleVariant="ghost"
							sizeVariant="small"
							to={`${pathname}?query=hello&account=all`}
							iconOnly
						>
							<SearchIcon />
						</Button>
					</ToolTip>
					<AccountViewDropdown />
					<ConnectButton />
				</Box>
			</Box>
		</Box>
	)
}

export default DesktopNavigation
