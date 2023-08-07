import { Box } from 'packages/ui/src/components/box'
import React from 'react'
import { Outlet, useMatches } from 'react-router-dom'

import Nav from './nav'

const Layout: React.FC = () => {
	const matches = useMatches()

	const [sidebar] = matches
		.filter(match => Boolean((match.handle as any)?.sidebar))
		.map(match => (match.handle as any).sidebar)

	return (
		<Box padding="large">
			<h1>Accounts</h1>
			<Nav />
			<Box paddingTop="large" display="flex" flexDirection="row">
				<Box>
					<Outlet />
				</Box>
				<Box>{sidebar}</Box>
			</Box>
		</Box>
	)
}

export default Layout
