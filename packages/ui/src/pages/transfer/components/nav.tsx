import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav: React.FC = () => (
	<nav>
		<ul>
			<NavLink to="/transfer/fungibles" end>
				{({ isActive }) => <li>Fungibles {isActive ? '(active)' : ''}</li>}
			</NavLink>
			<NavLink to="/transfer/non-fungibles" end>
				{({ isActive }) => <li>Non Fungibles {isActive ? '(active)' : ''}</li>}
			</NavLink>
			<NavLink to="/transfer/raw" end>
				{({ isActive }) => <li>Raw {isActive ? '(active)' : ''}</li>}
			</NavLink>
			<NavLink to="/transfer/deploy" end>
				{({ isActive }) => <li>Deploy {isActive ? '(active)' : ''}</li>}
			</NavLink>
		</ul>
	</nav>
)

export default Nav
