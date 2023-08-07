import React from 'react'
import { Outlet } from 'react-router-dom'

import Nav from './nav'

const Layout: React.FC = () => (
	<div>
		<h1>Radix Connector</h1>
		<Nav />
		<hr />
		<Outlet />
	</div>
)

export default Layout
