import React from 'react'
import clsx from 'clsx'
// import { BrowserRouter, Routes, Route, Link, useLocation, useMatch } from 'react-router-dom'
import { Link as LinkRouter, useMatch } from 'react-router-dom'
import { DropdownProfile } from '@src/containers/playground/containers/accounts/dropdown-profile'
import { RowsIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Link } from '@src/components/link'
import { Button } from '@src/components/button'
import { useAccountParams } from '@src/containers/playground/hooks/use-account-params'
// import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
// import { Button } from 'ui/src/components-v2/button'
import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'
import { motion, LayoutGroup } from 'framer-motion'

import * as styles from './navigation.css'

const Z3usLogoBrand = () => (
	<LinkRouter to="/accounts/all" className={styles.navigationLogoLink}>
		<Box className={styles.navigationLogoLinkScreen} />
		<svg x="0px" y="0px" viewBox="0 0 100 15" className={styles.logoSvg}>
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
	</LinkRouter>
)

const MenuItem = ({ text, href }) => {
	const match = useMatch(href)
	const { account } = useAccountParams()
	const accountMatchBlackList = ['transfer', 'staking', 'swap', 'settings']
	const isAccountsMatch = href === '/accounts/all' && account && !accountMatchBlackList.includes(account)
	const selected = !!match || isAccountsMatch

	return (
		<Link
			to={href}
			className={clsx(styles.navigationMenuLink)}
			underline="never"
			// className={clsx('z3-c-accounts-navigation__menu-item', selected && 'z3-c-accounts-navigation__menu-item--active')}
		>
			{selected ? <motion.span layoutId="underline" className={styles.navigationMenuActiveLine} /> : null}
			<Text size="small" color={selected ? 'white' : 'neutral'} className={styles.navigationMenuLinkText}>
				{text}
			</Text>
		</Link>
	)
}

export const Navigation: React.FC = () => (
	<Box component="nav" className={styles.navigationWrapper}>
		<Box className={styles.navigationContainer}>
			<Z3usLogoBrand />
			<Box className={styles.navigationMenu}>
				<LayoutGroup>
					{[
						{ text: 'Accounts', href: '/accounts/all' },
						{ text: 'Transfer', href: '/accounts/transfer' },
						{ text: 'Staking', href: '/accounts/staking' },
						{ text: 'Swap', href: '/accounts/swap' },
						{ text: 'Settings', href: '/accounts/settings' },
					].map(({ text, href }) => (
						<MenuItem text={text} key={href} href={href} />
					))}
				</LayoutGroup>
			</Box>
			<Box>
				<DropdownProfile />
			</Box>
		</Box>
	</Box>
)
