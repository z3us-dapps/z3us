import clsx from 'clsx'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { NavLink } from 'ui/src/components/router-link'

import { useMenuItems } from '../use-menu-items'
import * as styles from './styles.css'

const MobileFooterNavigation: React.FC = () => {
	const items = useMenuItems()
	return (
		<Box component="nav" className={styles.navigationMobileWrapper}>
			{items.map(({ href, icon, end, matchActiveFn }) => (
				<NavLink key={href} to={href} underline="never" end={end}>
					{state => (
						<Box className={styles.navigationMenuLinkMobile}>
							<Box
								className={clsx(
									styles.navigationMenuLinkMobileCircle,
									matchActiveFn(state)() && styles.navigationMenuLinkMobileCircleSelect,
								)}
							>
								{icon}
							</Box>
						</Box>
					)}
				</NavLink>
			))}
		</Box>
	)
}

export default MobileFooterNavigation
