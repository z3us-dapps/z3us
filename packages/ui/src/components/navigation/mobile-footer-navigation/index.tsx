import clsx from 'clsx'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { NavLink } from 'ui/src/components/router-link'

import { useMenuItems } from '../use-menu-items'
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

const MobileFooterNavigation: React.FC = () => {
	const items = useMenuItems()
	return (
		<Box component="nav" className={styles.navigationMobileWrapper}>
			{items.map(({ href, icon }) => (
				<MenuItemMobile key={href} href={href}>
					{icon}
				</MenuItemMobile>
			))}
		</Box>
	)
}

export default MobileFooterNavigation
