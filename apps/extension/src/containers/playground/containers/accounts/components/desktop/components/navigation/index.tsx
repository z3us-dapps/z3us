import React from 'react'
// import { BrowserRouter, Routes, Route, Link, useLocation, useMatch } from 'react-router-dom'
import { Link, useMatch } from 'react-router-dom'
import { DropdownProfile } from '@src/containers/playground/containers/accounts/components/dropdown-profile'
import { useAccountParams } from '@src/containers/playground/hooks/use-account-params'
import DropdownMenu from '@src/components/dropdown-menu'
import { motion, LayoutGroup } from 'framer-motion'
import { Z3usText } from 'ui/src/components/z3us-text'

import './navigation.css'

// const menuItems = ['Lorem', 'ipsum', 'dolor', 'sit']
const menuItems = [
	{ text: 'Accounts', href: '/accounts/all' },
	{ text: 'Transfer', href: '/accounts/transfer' },
	{ text: 'Staking', href: '/accounts/staking' },
	{ text: 'Swap', href: '/accounts/swap' },
	{ text: 'Settings', href: '/accounts/settings' },
]

const MenuItem = ({ text, href }) => {
	const match = useMatch(href)
	const { account } = useAccountParams()
	const isAccountsMatch = href === '/accounts/all' && account
	const selected = !!match || isAccountsMatch
	return (
		<Link to={href}>
			<motion.div className="menu-item" animate={{ opacity: selected ? 1 : 0.5 }}>
				{text}
				{selected && <motion.div className="underline" layoutId="underline" />}
			</motion.div>
		</Link>
	)
}

export const Navigation: React.FC = () => (
	<nav className="z3-c-accounts_navigation">
		<Link to="/accounts/all">
			<Z3usText className="z3-c-accounts_navigation__logo" />
		</Link>
		<div className="underlined-menu">
			<div className="wrapper">
				<LayoutGroup>
					{menuItems.map(({ text, href }) => (
						<MenuItem text={text} key={href} href={href} />
					))}
				</LayoutGroup>
			</div>
		</div>
		<DropdownProfile />
	</nav>
)
