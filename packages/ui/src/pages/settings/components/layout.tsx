import Loader from 'packages/ui/src/components/loader'
import React, { Suspense } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'

import Nav from './nav'

const Layout: React.FC = () => {
	const location = useLocation()
	const outlet = useOutlet()

	return (
		<div>
			<h1>Settings</h1>
			<Nav />
			<hr />
			<Suspense key={location.pathname} fallback={<Loader />}>
				{outlet}
			</Suspense>
		</div>
	)
}

export default Layout
