import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav: React.FC = () => (
	<nav>
		<ul>
			<NavLink to="/accounts">{({ isActive }) => <li>Accounts {isActive ? '(active)' : ''}</li>}</NavLink>
			<NavLink to="/transfer">{({ isActive }) => <li>Transfer {isActive ? '(active)' : ''}</li>}</NavLink>
			<NavLink to="/staking">{({ isActive }) => <li>Staking {isActive ? '(active)' : ''}</li>}</NavLink>
			<NavLink to="/settings">{({ isActive }) => <li>Settings {isActive ? '(active)' : ''}</li>}</NavLink>
			<NavLink to="/radix">{({ isActive }) => <li>Radix {isActive ? '(active)' : ''}</li>}</NavLink>
		</ul>
	</nav>
)

export default Nav
