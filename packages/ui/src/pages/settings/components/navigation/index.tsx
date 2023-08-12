import { LayoutGroup } from 'framer-motion'
import { t } from 'i18next'
import { PillNavigation } from 'packages/ui/src/components/pill-navigation'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { AddressBookIcon, CoinsIcon, Settings2Icon } from 'ui/src/components/icons'
import { NavLink } from 'ui/src/components/router-link'

const Navigation: React.FC = () => (
	<nav>
		<Box component="ul">
			<LayoutGroup id="settings-menu">
				{[
					{
						title: t('settings.navigation.generalTitle'),
						subTitle: t('settings.navigation.generalSubTitle'),
						href: '/settings/general',
						icon: <Settings2Icon />,
					},
					{
						title: t('settings.navigation.accountsTitle'),
						subTitle: t('settings.navigation.accountsSubTitle'),
						href: '/settings/accounts',
						icon: <CoinsIcon />,
					},
					{
						title: t('settings.navigation.accountsAddressBookTitle'),
						subTitle: t('settings.navigation.accountsAddressBookSubTitle'),
						href: '/settings/address-book',
						icon: <AddressBookIcon />,
					},
				].map(({ title, href }) => (
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

export default Navigation
