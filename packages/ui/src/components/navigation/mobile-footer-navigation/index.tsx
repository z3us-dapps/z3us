import clsx from 'clsx'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { CoinsIcon, Home2Icon, Settings2Icon, SwitchHorizontal } from 'ui/src/components/icons'
import { Link, NavLink } from 'ui/src/components/router-link'

import * as styles from './styles.css'

const MenuItemMobile = ({ href, children }: { href: string; children: React.ReactNode }) => (
	<NavLink to={href} end>
		{({ isActive }) => (
			<Link to={href} className={styles.navigationMenuLinkMobile} underline="never">
				<Box
					className={clsx(
						styles.navigationMenuLinkMobileCircle,
						isActive && styles.navigationMenuLinkMobileCircleSelect,
					)}
				>
					{children}
				</Box>
			</Link>
		)}
	</NavLink>
)

const MobileFooterNavigation: React.FC = () => (
	<Box component="nav" className={styles.navigationMobileWrapper}>
		{[
			{ href: '/accounts', icon: <Home2Icon /> },
			{ href: '/accounts/transfer/*', icon: <SwitchHorizontal /> },
			{ href: '/accounts/staking/*', icon: <CoinsIcon /> },
			{ href: '/accounts/settings/*', icon: <Settings2Icon /> },
		].map(({ href, icon }) => (
			<MenuItemMobile key={href} href={href}>
				{icon}
			</MenuItemMobile>
		))}
	</Box>
)

export default MobileFooterNavigation
