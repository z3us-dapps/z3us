import React from 'react'
// import { BrowserRouter, Routes, Route, Link, useLocation, useMatch } from 'react-router-dom'
import { Link, useMatch } from 'react-router-dom'
import { DropdownProfile } from '@src/containers/playground/containers/accounts/components/dropdown-profile'
import { useAccountParams } from '@src/containers/playground/hooks/use-account-params'
import DropdownMenu from '@src/components/dropdown-menu'
import { motion, LayoutGroup } from 'framer-motion'
import { Z3usText } from 'ui/src/components/z3us-text'

import './navigation.css'

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

const Z3usLogoBrand = () => (
	<div className="z3-c-accounts_navigation__logo">
		<svg viewBox="0 0 128 19">
			<g>
				<polygon points="8.2,3.7 4.8,3.7 0,0 0,18.3 18.8,3.7 	" />
				<path d="M72.4,14.6h16.8c1.6,0,2.9-1.3,2.9-2.9V0H69.5v11.7C69.5,13.3,70.8,14.6,72.4,14.6z" />
				<path
					d="M105.7,3.7c-1,0-1.8,0.8-1.8,1.8s0.8,1.8,1.8,1.8h14.6c3,0,5.5,2.5,5.5,5.5c0,3-2.5,5.5-5.5,5.5H98l4.8-3.7h17.6
		c1,0,1.8-0.8,1.8-1.8s-0.8-1.8-1.8-1.8h-14.6c-3,0-5.5-2.5-5.5-5.5s2.5-5.5,5.5-5.5h-9.9v10.4v2c0,3.2-2.6,5.9-5.9,5.9H71.7
		c-3.2,0-5.9-2.6-5.9-5.9V0H55.6c3.2,0,5.9,2.6,5.9,5.9v6.6c0,3.2-2.6,5.9-5.9,5.9H36.2l-4.8-3.7h23.4c1.6,0,2.9-1.3,2.9-2.9
		c0-2.8,0-1.6,0-5.1c0-1.6-1.3-2.9-2.9-2.9H31.5L36.2,0H30L10.6,14.6h10.2h4.4l4.8,3.7H0V19h128V0l-4.8,3.7H105.7z M38,7.3h15.4
		c0.4,0,0.7,0.3,0.7,0.7v2.2c0,0.4-0.3,0.7-0.7,0.7H38l-3.7-1.8L38,7.3z"
				/>
				<polygon points="128,0 128,0 128,0 	" />
			</g>
		</svg>
	</div>
)

export const Navigation: React.FC = () => (
	<nav className="z3-c-accounts_navigation">
		<Link to="/accounts/all">
			<Z3usLogoBrand />
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
