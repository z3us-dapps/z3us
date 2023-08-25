import { LayoutGroup } from 'framer-motion'
import { t } from 'i18next'
import { PillNavigation } from 'packages/ui/src/components/pill-navigation'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { NavLink } from 'ui/src/components/router-link'

const Navigation: React.FC = () => (
	<nav>
		<Box component="ul">
			<LayoutGroup id="transfer-menu">
				{[
					{
						title: t('transfer.navigation.tokenTitle'),
						href: '/transfer/tokens',
					},
					{
						title: t('transfer.navigation.nftTitle'),
						href: '/transfer/nfts',
					},
					{
						title: t('transfer.navigation.rawTitle'),
						href: '/transfer/raw',
					},
					{
						title: t('transfer.navigation.deployTitle'),
						href: '/transfer/deploy',
					},
					{
						title: 'Demo',
						href: '/transfer/demo',
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
