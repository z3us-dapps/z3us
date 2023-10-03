import { LayoutGroup } from 'framer-motion'
import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { PillNavigation } from 'ui/src/components/pill-navigation'
import { NavLink } from 'ui/src/components/router-link'

const messages = defineMessages({
	home: {
		id: 'transfer.navigation.home',
		defaultMessage: 'Transfer',
	},
	raw: {
		id: 'transfer.navigation.raw',
		defaultMessage: 'Advanced',
	},
	deploy: {
		id: 'transfer.navigation.deploy',
		defaultMessage: 'Deploy package',
	},
})

const Navigation: React.FC = () => {
	const intl = useIntl()

	return (
		<nav>
			<Box component="ul">
				<LayoutGroup id="transfer-menu">
					{[
						{
							title: intl.formatMessage(messages.home),
							href: '/transfer',
						},
						// {
						// 	title: intl.formatMessage(messages.deploy),
						// 	href: '/transfer/deploy',
						// },
						{
							title: intl.formatMessage(messages.raw),
							href: '/transfer/raw',
						},
					].map(({ title, href }) => (
						<Box key={href} component="li">
							<NavLink to={href} underline="never" end>
								{({ isActive }) => <PillNavigation text={title} matchActiveFn={() => isActive} />}
							</NavLink>
						</Box>
					))}
				</LayoutGroup>
			</Box>
		</nav>
	)
}

export default Navigation
