import React from 'react'
import clsx from 'clsx'
// import { BrowserRouter, Routes, Route, Link, useLocation, useMatch } from 'react-router-dom'
import { Link, useMatch } from 'react-router-dom'
import { DropdownProfile } from '@src/containers/playground/containers/accounts/components/dropdown-profile'
import { useAccountParams } from '@src/containers/playground/hooks/use-account-params'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from 'ui/src/components-v2/button'
import { motion, LayoutGroup } from 'framer-motion'

import './navigation.css'

const menuItems = [
	{ text: 'Accounts', href: '/accounts/all' },
	{ text: 'Transfer', href: '/accounts/transfer' },
	{ text: 'Staking', href: '/accounts/staking' },
	{ text: 'Swap', href: '/accounts/swap' },
	{ text: 'Settings', href: '/accounts/settings' },
]

const Z3usLogoBrand = () => (
	<div className="z3-c-accounts-navigation__logo">
		<svg x="0px" y="0px" viewBox="0 0 100 15">
			<g>
				<polygon points="6.4,2.9 3.8,2.9 0,0 0,14.3 14.7,2.9 		" />
				<path d="M56.6,11.4h13.1c1.2,0,2.3-1,2.3-2.3V0H54.3v9.1C54.3,10.4,55.3,11.4,56.6,11.4z" />
				<path
					d="M100,14.5V0l-3.8,2.9H82.6c-0.8,0-1.4,0.6-1.4,1.4s0.6,1.4,1.4,1.4H94c2.3,0,4.3,2,4.3,4.3s-2,4.3-4.3,4.3H76.6l3.8-2.9
			h13.8c0.8,0,1.4-0.6,1.4-1.4s-0.6-1.4-1.4-1.4H82.7c-2.3,0-4.3-2-4.3-4.3s2-4.3,4.3-4.3h-7.7v8.1v1.6c0,2.5-2,4.6-4.6,4.6H56
			c-2.5,0-4.6-2-4.6-4.6V0h-8C45.9,0,48,2,48,4.6v5.2c0,2.5-2,4.6-4.6,4.6H28.3l-3.8-2.9h18.3c1.2,0,2.3-1,2.3-2.3c0-2.2,0-1.2,0-4
			c0-1.2-1-2.3-2.3-2.3H24.6l3.7-3h-4.8L8.3,11.4h8h3.4l3.8,2.9H0v0.2h-2.6v18.9h107.7V14.5H100z M29.7,5.7h12
			c0.3,0,0.5,0.2,0.5,0.5V8c0,0.3-0.2,0.5-0.5,0.5h-12l-2.9-1.4L29.7,5.7z"
				/>
			</g>
		</svg>
	</div>
)

const MenuItem = ({ text, href }) => {
	const match = useMatch(href)
	const { account } = useAccountParams()
	const accountMatchBlackList = ['transfer', 'staking', 'swap', 'settings']
	const isAccountsMatch = href === '/accounts/all' && account && !accountMatchBlackList.includes(account)
	const selected = !!match || isAccountsMatch

	return (
		<Link to={href}>
			<motion.div
				animate={{ opacity: selected ? 1 : 1 }}
				className={clsx(
					'z3-c-accounts-navigation__menu-item',
					selected && 'z3-c-accounts-navigation__menu-item--active',
				)}
			>
				{selected ? <motion.span layoutId="underline" className="z3-c-accounts-navigation__menu-bg-line" /> : null}
				<p>{text}</p>
			</motion.div>
		</Link>
	)
}

export const Navigation: React.FC = () => (
	<nav className="z3-c-accounts-navigation">
		<div className="z3-c-accounts-navigation__container">
			<Link to="/accounts/all">
				<Z3usLogoBrand />
			</Link>
			<div className="z3-c-accounts-navigation__menu">
				<LayoutGroup>
					{menuItems.map(({ text, href }) => (
						<MenuItem text={text} key={href} href={href} />
					))}
				</LayoutGroup>
			</div>
			<div className="z3-c-accounts-navigation__menu-right">
				<Button size="small" intent="ghost" icon>
					<MagnifyingGlassIcon />
				</Button>
				<DropdownProfile />
			</div>
		</div>
	</nav>
)
