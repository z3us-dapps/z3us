import { LayoutGroup } from 'framer-motion'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { PillNavigation } from 'ui/src/components/pill-navigation'
import { NavLink } from 'ui/src/components/router-link'

import { useMenuItems } from './use-menu-items'

export const DesktopNavigation: React.FC = () => {
	const menuItems = useMenuItems()

	return (
		<nav>
			<Box component="ul">
				<LayoutGroup id="settings-menu">
					{menuItems.map(({ title, href }) => (
						<Box key={href} component="li">
							<NavLink to={href} underline="never">
								{({ isActive }) => <PillNavigation text={title} matchActiveFn={() => isActive} />}
							</NavLink>
						</Box>
					))}
				</LayoutGroup>
			</Box>
		</nav>
	)
}
