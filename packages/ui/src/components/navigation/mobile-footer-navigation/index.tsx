import clsx from 'clsx'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { Home2Icon, Settings2Icon, SwitchHorizontal } from 'ui/src/components/icons'
import { NavLink } from 'ui/src/components/router-link'

import * as styles from './styles.css'

const MenuItemMobile = ({ href, children }: { href: string; children: React.ReactNode }) => (
	<NavLink to={href} underline="never">
		{({ isActive }) => (
			<Box className={styles.navigationMenuLinkMobile}>
				<Box
					className={clsx(
						styles.navigationMenuLinkMobileCircle,
						isActive && styles.navigationMenuLinkMobileCircleSelect,
					)}
				>
					{children}
				</Box>
			</Box>
		)}
	</NavLink>
)

const MobileFooterNavigation: React.FC = () => (
	<Box component="nav" className={styles.navigationMobileWrapper}>
		{[
			{ href: '/accounts', icon: <Home2Icon /> },
			{ href: '/transfer', icon: <SwitchHorizontal /> },
			{ href: '/settings/general', icon: <Settings2Icon /> },
		].map(({ href, icon }) => (
			<MenuItemMobile key={href} href={href}>
				{icon}
			</MenuItemMobile>
		))}
	</Box>
)

export default MobileFooterNavigation
