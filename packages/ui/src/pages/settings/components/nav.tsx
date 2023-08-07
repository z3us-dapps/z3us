import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav: React.FC = () => (
	<nav>
		<ul>
			<NavLink to="/settings" end>
				{({ isActive }) => <li>General {isActive ? '(active)' : ''}</li>}
			</NavLink>
			<NavLink to="/settings/accounts" end>
				{({ isActive }) => <li>Accounts {isActive ? '(active)' : ''}</li>}
			</NavLink>
			<NavLink to="/settings/address-book" end>
				{({ isActive }) => <li>Address Book {isActive ? '(active)' : ''}</li>}
			</NavLink>
		</ul>
	</nav>
)

export default Nav
