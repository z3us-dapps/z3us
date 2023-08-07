import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav: React.FC = () => (
	<nav>
		<ul>
			<NavLink to="/accounts/-/fungibles" end>
				{({ isActive }) => <li>Fungibles {isActive ? '(active)' : ''}</li>}
			</NavLink>
			<NavLink to="/accounts/-/non-fungibles" end>
				{({ isActive }) => <li>NonFungibles {isActive ? '(active)' : ''}</li>}
			</NavLink>
		</ul>
	</nav>
)

export default Nav
